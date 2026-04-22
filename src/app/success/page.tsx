"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type StoredOrganization = {
  id: string;
  name: string;
  rccm: string;
  affiliationCode?: string;
  vehicleCount?: number;
};

function parseStoredOrganization(raw: string | null): StoredOrganization | null {
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredOrganization;
  } catch {
    return null;
  }
}

function SuccessPageContent() {
  const params = useSearchParams();
  const [storedOrganization, setStoredOrganization] = useState<StoredOrganization | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setStoredOrganization(parseStoredOrganization(window.localStorage.getItem("yely_organization")));
  }, []);

  const type = params.get("type") || "driver";

  if (type === "organization") {
    const organizationName = storedOrganization?.name || params.get("organizationName") || "votre organisation";
    const affiliationCode = storedOrganization?.affiliationCode || params.get("affiliationCode") || "";

    return (
      <section className="min-h-screen bg-slate-50 px-4 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <h1 className="text-2xl font-semibold text-slate-900">Compte organisation cree</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Bienvenue. L'organisation <span className="font-semibold text-slate-900">{organizationName}</span> est prete.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Votre compte proprietaire est actif. Vous pouvez maintenant acceder a votre espace organisation.
          </p>

          {affiliationCode && (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Code d'affiliation</p>
              <p className="mt-1 text-lg font-semibold text-emerald-700">{affiliationCode}</p>
            </div>
          )}

          <div className="mt-8 space-y-3">
            <Link
              href="/organisation-dashboard"
              className="block w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Aller a mon espace
            </Link>
            <Link
              href="/"
              className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const firstName = params.get("firstName") || "";
  const referralCode = params.get("referralCode") || "";
  const qrCodeToken = params.get("qrCodeToken") || "";
  const affStatus = params.get("affStatus") || "";
  const organizationName = params.get("organizationName") || "";
  const affiliationCode = params.get("aff") || "";

  const referralLink = useMemo(() => {
    return `https://yely.app?ref=${referralCode}`;
  }, [referralCode]);

  const whatsappMessage = useMemo(() => {
    return `Je gagne du cashback carburant avec YELY.\n\nInscris-toi ici: ${referralLink}\n\nCode: ${referralCode}`;
  }, [referralLink, referralCode]);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-black text-slate-900">Compte cree</h1>

        <p className="mt-2 text-sm text-slate-600">Bienvenue {firstName}, tu peux maintenant gagner du cashback.</p>

        <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
          <p className="text-xs text-slate-500">Ton code de parrainage</p>
          <p className="mt-1 text-lg font-black text-[#0f9b58]">{referralCode}</p>
        </div>

        <p className="mt-6 text-sm text-slate-600">Invite tes amis et gagne encore plus a chaque plein.</p>

        {affStatus === "success" ? (
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Affiliation organisation</p>
            <p className="mt-1 text-sm text-blue-900">
              Votre compte est maintenant rattaché
              {organizationName ? (
                <>
                  {" "}
                  à l&apos;organisation <span className="font-semibold">{organizationName}</span>.
                </>
              ) : (
                "."
              )}
            </p>
          </div>
        ) : null}

        {affStatus === "error" ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Affiliation organisation</p>
            <p className="mt-1 text-sm text-amber-900">
              Votre compte a bien été créé, mais le rattachement
              {affiliationCode ? (
                <>
                  {" "}
                  au code <span className="font-semibold">{affiliationCode}</span>
                </>
              ) : null}{" "}
              n&apos;a pas pu être finalisé pour le moment.
            </p>
          </div>
        ) : null}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 block w-full rounded-2xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg"
        >
          Partager sur WhatsApp
        </a>

        <button
          onClick={copyLink}
          className="mt-3 w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-700"
        >
          Copier mon lien
        </button>

        <a href={`/chauffeur?qrCodeToken=${qrCodeToken}`} className="mt-6 block text-sm font-semibold text-[#0f9b58]">
          Continuer
        </a>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
            <p className="text-sm text-slate-600">Chargement...</p>
          </div>
        </section>
      }
    >
      <SuccessPageContent />
    </Suspense>
  );
}
