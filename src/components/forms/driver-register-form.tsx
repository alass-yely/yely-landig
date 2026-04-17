"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { track } from "@/lib/tracking/events";
import { useAffiliationPreview } from "@/hooks/use-affiliation-preview";
import { useReferralPreview } from "@/hooks/use-referral-preview";
import { registerDriver } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { trackEvent } from "@/lib/utils/track";
import type { RegisterDriverPayload } from "@/types/auth";

type DriverRegisterFormProps = {
  initialReferralCode?: string;
  affiliationCode?: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  pin: string;
  referralCode: string;
};

function normalizePhone(phone: string) {
  const clean = phone.replace(/\D/g, "");

  if (clean.startsWith("225")) {
    return `+${clean}`;
  }

  return `+225${clean}`;
}

export function DriverRegisterForm({
  initialReferralCode = "",
  affiliationCode = "",
}: DriverRegisterFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    pin: "",
    referralCode: initialReferralCode,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const referralPreview = useReferralPreview(form.referralCode);
  const affiliationPreview = useAffiliationPreview(affiliationCode);

  const isValid = useMemo(() => {
    return (
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.pin.trim().length >= 4
    );
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!form.firstName.trim()) {
      setErrorMessage("Le prenom est requis.");
      return;
    }

    if (!form.lastName.trim()) {
      setErrorMessage("Le nom est requis.");
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage("Le telephone est requis.");
      return;
    }

    if (!form.pin.trim()) {
      setErrorMessage("Le PIN est requis.");
      return;
    }

    if (form.pin.trim().length < 4) {
      setErrorMessage("Le PIN doit contenir au moins 4 caracteres.");
      return;
    }

    const payload: RegisterDriverPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: normalizePhone(form.phone.trim()),
      pin: form.pin.trim(),
      ...(form.referralCode.trim() ? { referralCode: form.referralCode.trim() } : {}),
    };

    setIsSubmitting(true);

    try {
      const response = await registerDriver(payload);
      const session = response.data;

      try {
        localStorage.setItem("yely_access_token", session.accessToken);
        localStorage.setItem("yely_refresh_token", session.refreshToken);
        localStorage.setItem("yely_user", JSON.stringify(session.user));
      } catch {
        // Ignore storage errors
      }

      const query = new URLSearchParams({
        firstName: session.user.firstName,
        qrCodeToken: session.user.qrCodeToken,
      });

      if (session.user.referralCode) {
        query.set("referralCode", session.user.referralCode);
      }

      if (affiliationCode) {
        query.set("aff", affiliationCode);
      }

      trackEvent("register_success", {
        userId: session.user.id,
        referralCode: session.user.referralCode,
      });

      setIsSuccess(true);
      window.dispatchEvent(new Event("storage"));
      track("driver_register_success", {
        phone: payload.phone,
        referralCode: session.user.referralCode,
      });
      router.push(`/chauffeur?${query.toString()}`);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(error.message || "Inscription impossible pour le moment.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de reessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const shouldShowReferralInvalid =
    form.referralCode.trim().length > 0 && !referralPreview.loading && referralPreview.valid === false;
  const shouldShowReferralValid = referralPreview.valid && referralPreview.driver;
  const shouldShowAffiliationValid = affiliationPreview.valid && affiliationPreview.organization;

    return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Ligne Prénom & Nom */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Prénom</label>
          <input
            type="text"
            placeholder="Ex: Jean"
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/10"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Nom</label>
          <input
            type="text"
            placeholder="Ex: Kouassi"
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/10"
          />
        </div>
      </div>

      {/* Téléphone avec préfixe visuel */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 ml-1">Numéro de téléphone</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none border-r border-slate-200 pr-3 my-2 text-sm font-bold text-slate-400 group-focus-within:text-[#0f9b58]">
            <span className="mr-1">🇨🇮</span> +225
          </div>
          <input
            type="tel"
            placeholder="0700000000"
            maxLength={10}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-28 pr-4 py-3 text-sm transition focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/10"
          />
        </div>
      </div>

      {/* Code PIN */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 ml-1">Code PIN (4 chiffres)</label>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          placeholder="••••"
          value={form.pin}
          onChange={(e) => updateField("pin", e.target.value.replace(/\D/g, ""))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm tracking-[0.5em] transition focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/10"
        />
      </div>

      {/* Section Parrainage & Affiliation (Amélioration Graphique) */}
      <div className="space-y-3 pt-2">
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700 ml-1">Code de parrainage (Optionnel)</label>
          <input
            type="text"
            placeholder="Ex: YELY-123"
            value={form.referralCode}
            onChange={(e) => updateField("referralCode", e.target.value.toUpperCase())}
            className={`w-full rounded-2xl border px-4 py-3 text-sm font-mono transition-all ${
              shouldShowReferralValid 
                ? "border-[#0f9b58] bg-emerald-50 text-[#0f9b58]" 
                : shouldShowReferralInvalid 
                ? "border-red-200 bg-red-50" 
                : "border-slate-200 bg-slate-50/50"
            }`}
          />
        </div>

        {/* Feedback visuel des codes */}
        <div className="space-y-2">
          {shouldShowReferralValid && (
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#0f9b58] bg-emerald-100/50 p-2 rounded-lg">
              <div className="h-5 w-5 rounded-full bg-[#0f9b58] text-white flex items-center justify-center text-[10px]">✓</div>
              Parrainé par {referralPreview.driver?.firstName} {referralPreview.driver?.lastName}
            </div>
          )}
          
          {shouldShowReferralInvalid && (
            <p className="text-[11px] font-medium text-red-600 ml-1">Ce code de parrainage n&apos;existe pas.</p>
          )}

          {shouldShowAffiliationValid && (
            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 bg-blue-50 p-2 rounded-lg border border-blue-100">
              <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">i</div>
              Rattaché à l&apos;organisation : {affiliationPreview.organization?.name}
            </div>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 p-4 text-xs font-medium text-red-700">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-200 text-[10px]">!</span>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full rounded-2xl bg-[#0f9b58] py-4 text-sm font-bold text-white shadow-lg shadow-[#0f9b58]/20 transition-all hover:bg-[#0b7a45] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? "Création du compte..." : "S'inscrire gratuitement"}
      </button>
    </form>
  );
}
