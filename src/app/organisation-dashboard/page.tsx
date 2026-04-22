"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BackofficeShell } from "@/components/backoffice/layout/backoffice-shell";
import { OrganizationAffiliationCard } from "@/components/backoffice/organization/organization-affiliation-card";
import { OrganizationDriversTable } from "@/components/backoffice/organization/organization-drivers-table";
// import { OrganizationManagersSection } from "@/components/backoffice/organization/organization-managers-section";
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

  // const [managers, setManagers] = useState<OrganizationManagerListItem[]>([]);
  // const [managersLoading, setManagersLoading] = useState(true);
  // const [managersError, setManagersError] = useState<string | null>(null);

  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const reloadManagers = useCallback(async (accessToken: string) => {


    try {
      const response = await getOrganizationDashboardStaff(accessToken, { page: 1, pageSize: 20 });
      const payload = response.data as OrganizationManagerListItem[] | { items?: OrganizationManagerListItem[] };
    } catch (error) {
      if (error instanceof Error) {
      } else {
      }
    } finally {

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
      title="Tableau de bord"
      subtitle="Gestion centralisée de votre flotte et de vos collaborateurs."
    >
      {/* 1. SECTION STATS / OVERVIEW (Nouveau) */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Chauffeurs actifs</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{drivers.length}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
        </div>
        
        {/* On déplace l'AffiliationCard ici pour qu'elle soit toujours visible mais compacte */}
        <div className="md:col-span-2">
           {overviewLoading ? (
            <div className="h-full animate-pulse bg-slate-100 rounded-2xl border border-slate-200" />
          ) : (
            <OrganizationAffiliationCard affiliationCode={affiliationCode} />
          )}
        </div>
      </div>

      {/* 2. SECTION PRINCIPALE (TABLE) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0f9b58]" />
            Liste des chauffeurs affiliés
          </h2>
          <button className="text-sm font-semibold text-[#0f9b58] hover:underline">
            Exporter en CSV
          </button>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <OrganizationDriversTable drivers={drivers} loading={driversLoading} error={driversError} />
        </div>
      </div>

      {/* 3. SECTION SECONDAIRE (PROFIL & CONFIG) */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
             <OrganizationProfileSection
                profile={profile}
                loading={profileLoading}
                error={profileError}
                onUpdateProfile={handleUpdateProfile}
              />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6">
            <h3 className="font-bold text-blue-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-sm text-blue-700 leading-relaxed mb-4">
              Votre affiliationCode est la clé pour rattacher vos chauffeurs. Partagez-le via WhatsApp ou Email.
            </p>
            <button className="text-sm font-bold text-blue-900 underline">
              Consulter le guide manager
            </button>
          </div>
        </div>
      </div>
    </BackofficeShell>
  );
}
