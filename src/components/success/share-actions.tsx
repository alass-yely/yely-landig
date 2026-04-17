"use client";

import { useMemo, useState } from "react";

import { env } from "@/lib/config/env";
import { track } from "@/lib/tracking/events";

type ShareActionsProps = {
  referralCode?: string;
};

export function ShareActions({ referralCode }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareLink = useMemo(() => {
    if (!referralCode) return "";

    const baseUrl = env.landingBaseUrl?.trim();
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const root = baseUrl || origin;

    if (!root) return "";

    return `${root.replace(/\/$/, "")}/register?ref=${encodeURIComponent(referralCode)}`;
  }, [referralCode]);

  const whatsappLink = useMemo(() => {
    if (!shareLink) return "";
    const message = `Je viens de rejoindre YELY. Inscris-toi avec mon lien : ${shareLink}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [shareLink]);

  async function handleCopy() {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      track("referral_copy_click", { 
        referralCode,
        shareLink,
       });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!referralCode) {
    return (
      <p className="text-sm text-slate-500">
        Votre lien de partage apparaitra une fois votre code de parrainage disponible.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        {shareLink || "Lien de partage indisponible pour le moment."}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-md bg-[#0f9b58] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b7a45]"
        >
          {copied ? "Lien copie" : "Copier mon lien"}
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_share_click", { referralCode, shareLink })}
          className="inline-flex items-center justify-center rounded-md border border-[#0f9b58] bg-white px-5 py-3 text-sm font-semibold text-[#0f9b58] transition hover:bg-[#0f9b58]/10"
        >
          Partager sur WhatsApp
        </a>
      </div>
      {!shareLink ? (
        <p className="text-xs text-slate-500">
          Configurez `NEXT_PUBLIC_LANDING_BASE_URL` pour generer un lien stable.
        </p>
      ) : null}
    </div>
  );
}
