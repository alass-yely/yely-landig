"use client";

import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api/client";

type ApplyState = "idle" | "loading" | "success" | "error";

type AffiliationApplyProps = {
  code: string;
};

export function AffiliationApply({ code }: AffiliationApplyProps) {
  const [state, setState] = useState<ApplyState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    if (hasApplied) return;

    const trimmedCode = code.trim();
    if (!trimmedCode) return;

    const accessToken = window.localStorage.getItem("yely_access_token");
    if (!accessToken) {
      setState("error");
      setMessage("Connectez-vous pour appliquer l'affiliation.");
      return;
    }

    setHasApplied(true);

    async function applyAffiliation() {
      setState("loading");

      try {
        await apiRequest("/network/affiliations/apply", {
          method: "POST",
          body: { code: trimmedCode },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setState("success");
        setMessage("Vous etes maintenant affilie.");
      } catch (error: any) {
        setState("error");

        const backendMessage =
          error?.data?.message || error?.message || "L'affiliation n'a pas pu etre appliquee.";

        setMessage(Array.isArray(backendMessage) ? backendMessage.join(" ") : backendMessage);
      }
    }

    applyAffiliation();
  }, [code, hasApplied]);

  if (state === "idle") return null;

  const baseClasses = "rounded-xl border px-4 py-3 text-sm";

  if (state === "loading") {
    return <div className={`${baseClasses} border-slate-200 bg-slate-50 text-slate-600`}>Association en cours...</div>;
  }

  if (state === "success") {
    return <div className={`${baseClasses} border-emerald-200 bg-emerald-50 text-emerald-700`}>{message}</div>;
  }

  return <div className={`${baseClasses} border-amber-200 bg-amber-50 text-amber-700`}>{message}</div>;
}
