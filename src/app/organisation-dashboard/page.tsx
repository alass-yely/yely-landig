"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BackofficeShell } from "@/components/backoffice/layout/backoffice-shell";
import { OrganizationAffiliationCard } from "@/components/backoffice/organization/organization-affiliation-card";
import { OrganizationDriversTable } from "@/components/backoffice/organization/organization-drivers-table";
import { OrganizationManagersSection } from "@/components/backoffice/organization/organization-managers-section";
import { OrganizationProfileSection } from "@/components/backoffice/organization/organization-profile-section";
import { StateCard } from "@/components/backoffice/shared/state-card";
import {
  createOrganizationManager,
  getMyOrganizationProfile,
  getOrganizationDashboardDrivers,
  getOrganizationDashboardOverview,
  getOrganizationDashboardStaff,
  updateMyOrganizationProfile,
} from "@/lib/api/organization-dashboard";
import { getAccessToken, getStoredOrganization, getStoredUser } from "@/lib/utils/session";
import type {
  CreateOrganizationManagerPayload,
  OrganizationDashboardOverview,
  OrganizationDriverListItem,
  OrganizationManagerListItem,
  OrganizationProfile,
  UpdateOrganizationProfilePayload,
} from "@/types/organization";

type Role = "ORG_OWNER" | "ORG_MANAGER";

function isAuthorizedRole(role?: string): role is Role {
  return role === "ORG_OWNER" || role === "ORG_MANAGER";
}

function getListItems<T>(payload: T[] | { items?: T[] } | null | undefined): T[] {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.items)) return payload.items;
  return [];
}

export default function OrganizationDashboardPage() {
  const router = useRouter();

  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isForbidden, setIsForbidden] = useState(false);

  const [overview, setOverview] = useState<OrganizationDashboardOverview | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  const [drivers, setDrivers] = useState<OrganizationDriverListItem[]>([]);
  const [driversLoading, setDriversLoading] = useState(true);
  const [driversError, setDriversError] = useState<string | null>(null);

  const [managers, setManagers] = useState<OrganizationManagerListItem[]>([]);
  const [managersLoading, setManagersLoading] = useState(true);
  const [managersError, setManagersError] = useState<string | null>(null);

  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const reloadManagers = useCallback(async (accessToken: string) => {
    setManagersLoading(true);
    setManagersError(null);

    try {
      const response = await getOrganizationDashboardStaff(accessToken, { page: 1, pageSize: 20 });
      const payload = response.data as OrganizationManagerListItem[] | { items?: OrganizationManagerListItem[] };
      setManagers(getListItems(payload));
    } catch (error) {
      if (error instanceof Error) {
        setManagersError(error.message || "Impossible de charger les managers.");
      } else {
        setManagersError("Impossible de charger les managers.");
      }
    } finally {
      setManagersLoading(false);
    }
  }, []);

  const reloadProfile = useCallback(async (accessToken: string) => {
    setProfileLoading(true);
    setProfileError(null);

    try {
      const response = await getMyOrganizationProfile(accessToken);
      setProfile(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setProfileError(error.message || "Impossible de charger le profil.");
      } else {
        setProfileError("Impossible de charger le profil.");
      }
    } finally {
      setProfileLoading(false);
    }
  }, []);

  async function handleCreateManager(payload: CreateOrganizationManagerPayload) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    await createOrganizationManager(accessToken, payload);
    await reloadManagers(accessToken);
  }

  async function handleUpdateProfile(payload: UpdateOrganizationProfilePayload) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      router.replace("/login");
      return;
    }

    const response = await updateMyOrganizationProfile(accessToken, payload);
    setProfile(response.data);
  }

  useEffect(() => {
    const accessToken = getAccessToken();
    const user = getStoredUser();

    if (!accessToken || !user) {
      router.replace("/login");
      return;
    }

    if (!isAuthorizedRole(user.role)) {
      setIsForbidden(true);
      setIsCheckingAccess(false);
      return;
    }
    const token = accessToken;

    const storedOrganization = getStoredOrganization();
    if (storedOrganization?.affiliationCode) {
      setOverview((current) =>
        current ?? {
          organizationId: storedOrganization.id,
          organizationName: storedOrganization.name,
          affiliationCode: storedOrganization.affiliationCode || "",
        },
      );
    }

    setIsCheckingAccess(false);

    async function loadOverview() {
      setOverviewLoading(true);
      setOverviewError(null);
      try {
        const response = await getOrganizationDashboardOverview(token);
        setOverview(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setOverviewError(error.message || "Impossible de charger l'overview.");
        } else {
          setOverviewError("Impossible de charger l'overview.");
        }
      } finally {
        setOverviewLoading(false);
      }
    }

    async function loadDrivers() {
      setDriversLoading(true);
      setDriversError(null);
      try {
        const response = await getOrganizationDashboardDrivers(token, { page: 1, pageSize: 20 });
        const payload = response.data as OrganizationDriverListItem[] | { items?: OrganizationDriverListItem[] };
        setDrivers(getListItems(payload));
      } catch (error) {
        if (error instanceof Error) {
          setDriversError(error.message || "Impossible de charger les chauffeurs.");
        } else {
          setDriversError("Impossible de charger les chauffeurs.");
        }
      } finally {
        setDriversLoading(false);
      }
    }

    loadOverview();
    loadDrivers();
    reloadManagers(token);
    reloadProfile(token);
  }, [reloadManagers, reloadProfile, router]);

  if (isCheckingAccess) {
    return (
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <StateCard title="Chargement" description="Préparation du dashboard organisation..." />
        </div>
      </section>
    );
  }

  if (isForbidden) {
    return (
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <StateCard
            title="Accès interdit"
            description="Votre rôle ne permet pas d'accéder à ce dashboard organisation."
            tone="danger"
            ctaHref="/"
            ctaLabel="Retour à l'accueil"
          />
        </div>
      </section>
    );
  }

  const affiliationCode = overview?.affiliationCode || "";

  return (
    <BackofficeShell
      title="Dashboard organisation"
      subtitle="Suivez vos chauffeurs affiliés, gérez vos managers et mettez à jour votre profil en quelques actions."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {overviewLoading ? (
          <StateCard title="Affiliation" description="Chargement de votre code d'affiliation..." />
        ) : overviewError ? (
          <StateCard title="Affiliation" description={overviewError} tone="danger" />
        ) : (
          <OrganizationAffiliationCard affiliationCode={affiliationCode} />
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Actions rapides</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-900">Inviter un chauffeur</h2>
          <p className="mt-2 text-sm text-slate-600">
            Partagez votre code d&apos;affiliation ou dirigez un chauffeur vers le formulaire d&apos;inscription avec votre lien.
          </p>
          <Link
            href={affiliationCode ? `/register?aff=${encodeURIComponent(affiliationCode)}` : "/register"}
            className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Ouvrir le formulaire chauffeur
          </Link>
        </div>
      </div>

      <OrganizationDriversTable drivers={drivers} loading={driversLoading} error={driversError} />

      <div className="grid gap-6 lg:grid-cols-2">
        <OrganizationManagersSection
          managers={managers}
          loading={managersLoading}
          error={managersError}
          onCreateManager={handleCreateManager}
        />

        <OrganizationProfileSection
          profile={profile}
          loading={profileLoading}
          error={profileError}
          onUpdateProfile={handleUpdateProfile}
        />
      </div>
    </BackofficeShell>
  );
}
