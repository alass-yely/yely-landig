"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Lock, Loader2, AlertCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import { login } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { getPostLoginRedirectPath } from "@/lib/utils/auth-redirect";
import { normalizePhone } from "@/lib/utils/phone";
import { setStoredSession } from "@/lib/utils/session";
import { trackEvent } from "@/lib/utils/track";
import type { AuthOrganization, LoginPayload } from "@/types/auth";

const PIN_REGEX = /^\d{4}$/;

function isStoredOrganization(value: unknown): value is AuthOrganization {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.rccm === "string"
  );
}

function isSafeInternalNextPath(value: string | null): value is string {
  if (!value) return false;
  if (!value.startsWith("/")) return false;
  if (value.startsWith("//")) return false;
  return true;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const controls = useAnimation();
  const [form, setForm] = useState({ phone: "", pin: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerShake = async () => {
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 },
    });
  };

  const isValid = useMemo(() => {
    const cleanPhone = form.phone.replace(/\D/g, "");
    return cleanPhone.length === 10 && PIN_REGEX.test(form.pin.trim());
  }, [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!form.phone.trim()) {
      setErrorMessage("Le telephone est requis.");
      return;
    }

    if (!form.pin.trim()) {
      setErrorMessage("Le PIN est requis.");
      return;
    }

    if (!PIN_REGEX.test(form.pin.trim())) {
      setErrorMessage("Le PIN doit contenir exactement 4 chiffres.");
      return;
    }

    const payload: LoginPayload = {
      phone: normalizePhone(form.phone),
      pin: form.pin.trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await login(payload);
      const session = response.data;

      const maybeOrganization = (session as { organization?: unknown }).organization;
      setStoredSession({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: session.user,
        organization: isStoredOrganization(maybeOrganization) ? maybeOrganization : null,
      });

      trackEvent("login_success", {
        userId: session.user.id,
        role: session.user.role,
      });

      const nextPath = searchParams.get("next");
      const redirectPath = isSafeInternalNextPath(nextPath)
        ? nextPath
        : getPostLoginRedirectPath(session.user.role);

      router.push(redirectPath);
    } catch (error) {
      if (error instanceof ApiClientError) {
        triggerShake();
        setErrorMessage(error.message || "Identifiants incorrects.");
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inattendue est survenue. Merci de reessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form animate={controls} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Numero de telephone</label>
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0f9b58]">
            <Phone size={18} />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-10 my-auto flex h-2/3 items-center border-r border-slate-200 pr-2">
            <span className="mr-2 text-sm font-bold text-slate-400">+225</span>
          </div>
          <input
            type="tel"
            value={form.phone}
            maxLength={10}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-4 pl-24 pr-4 text-slate-900 placeholder-slate-400 transition-all focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/20"
            placeholder="0700000000"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">Code PIN</label>
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0f9b58]">
            <Lock size={18} />
          </div>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={form.pin}
            onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "") })}
            className="block w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-4 pl-11 pr-4 tracking-[0.5em] text-slate-900 transition-all focus:border-[#0f9b58] focus:ring-2 focus:ring-[#0f9b58]/20"
            placeholder="1234"
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">Entrez votre PIN a 4 chiffres.</p>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} className="shrink-0" />
          {errorMessage}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="flex w-full items-center justify-center rounded-2xl bg-[#0f9b58] py-4 text-sm font-bold text-white shadow-lg shadow-[#0f9b58]/20 transition-all hover:bg-[#0b7a45] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Se connecter"}
      </button>
    </motion.form>
  );
}
