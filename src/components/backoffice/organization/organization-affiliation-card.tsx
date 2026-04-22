"use client";

import { useMemo, useState } from "react";

import { env } from "@/lib/config/env";

type OrganizationAffiliationCardProps = {
  affiliationCode: string;
};

export function OrganizationAffiliationCard({ affiliationCode }: OrganizationAffiliationCardProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const inviteLink = useMemo(() => {
    const baseUrl = env.landingBaseUrl || (typeof window !== "undefined" ? window.location.origin : "");
    const normalized = baseUrl.replace(/\/$/, "");
    return `${normalized}/register?aff=${encodeURIComponent(affiliationCode)}`;
  }, [affiliationCode]);

  const whatsappUrl = useMemo(() => {
    const message = `Rejoins mon organisation sur YELY avec ce lien: ${inviteLink}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [inviteLink]);

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(affiliationCode);
      setFeedback("Code copie.");
    } catch {
      setFeedback("Impossible de copier le code.");
    }
  }

  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setFeedback("Lien d'invitation copie.");
    } catch {
      setFeedback("Impossible de copier le lien.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Code d&apos;affiliation</p>
      <p className="mt-2 text-2xl font-semibold tracking-wide text-emerald-700">{affiliationCode || "-"}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleCopyCode}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Copier le code
        </button>
        <button
          type="button"
          onClick={handleCopyInviteLink}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Inviter un chauffeur
        </button>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        Inviter via WhatsApp
      </a>

      {feedback ? <p className="mt-3 text-xs text-slate-500">{feedback}</p> : null}
    </div>
  );
}
