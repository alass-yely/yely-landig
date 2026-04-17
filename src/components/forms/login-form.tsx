"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Lock, Loader2, AlertCircle } from "lucide-react";

import { track } from "@/lib/tracking/events";
import { login } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { trackEvent } from "@/lib/utils/track";
import type { LoginPayload } from "@/types/auth";
import { motion, useAnimation } from "framer-motion";

function getRedirectPath(role: string) {
  if (role === "DRIVER") return "/chauffeur";
  if (role === "CASHIER" || role === "STATION_MANAGER") return "/organisation";
  if (role === "YELY_ADMIN") return "/organisation";
  return "/";
}

export function LoginForm() {
  const router = useRouter();
  const controls = useAnimation();
  const [form, setForm] = useState({ phone: "", pin: ""});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerShake = async () => {
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    });
  };

  const isValid = useMemo(() => {
    const cleanPhone = form.phone.replace(/\s/g, "");
    return cleanPhone.length >= 10 && form.pin.trim().length >= 4;
  }, [form]);


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    function normalizePhone(phone: string) {
      const clean = phone.replace(/\D/g, "");

      if (clean.startsWith("225")) {
        return `+${clean}`;
      }

      return `+225${clean}`;
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

    const payload: LoginPayload = {
      phone: normalizePhone(form.phone),
      pin: form.pin.trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await login(payload);
      const session = response.data;

      localStorage.setItem("yely_access_token", session.accessToken);
      localStorage.setItem("yely_refresh_token", session.refreshToken);
      try {
      localStorage.setItem("yely_user", JSON.stringify(session.user));
      } catch {
        // Ignore JSON serialization errors for user data
      }

      trackEvent("login_success", {
        userId: session.user.id,
        role: session.user.role,
      });

      const redirectPath = getRedirectPath(session.user.role);
      window.dispatchEvent(new Event("storage"));
      track("driver_login_success", {
        phone: payload.phone,
      });
      router.push(redirectPath);
    } catch (error) {
      if (error instanceof ApiClientError) {
        triggerShake();
        setErrorMessage(error.message || "Identifiants incorrects..");
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
      {/* Champ Téléphone */}
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Numéro de téléphone
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f9b58]">
            <Phone size={18} />
          </div>
          <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none pr-2 border-r border-slate-200 h-2/3 my-auto">
             <span className="text-sm font-bold text-slate-400 mr-2">🇨🇮 +225</span>
          </div>
          <input
            type="tel"
            value={form.phone}
            maxLength={10} // Limite à 10 chiffres pour le format CI
            onChange={(e) => setForm({...form, phone: e.target.value.replace(/\D/g, "")})} // Garde uniquement les chiffres
            className="block w-full pl-28 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0f9b58]/20 focus:border-[#0f9b58] transition-all bg-slate-50/50"
            placeholder="07 00 00 00 00"
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-400 italic">Entrez vos 10 chiffres habituels.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Code PIN</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f9b58]">
            <Lock size={18} />
          </div>
          <input
            type="password"
            inputMode="numeric"
            value={form.pin}
            onChange={(e) => setForm({...form, pin: e.target.value})}
            className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-slate-900 tracking-[0.5em] focus:ring-2 focus:ring-[#0f9b58]/20 focus:border-[#0f9b58] transition-all bg-slate-50/50"
            placeholder="••••"
          />
        </div>
      </div>

      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm"
        >
          <AlertCircle size={18} className="shrink-0" />
          {errorMessage}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full flex items-center justify-center rounded-2xl bg-[#0f9b58] py-4 text-sm font-bold text-white shadow-lg shadow-[#0f9b58]/20 transition-all hover:bg-[#0b7a45] active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Se connecter"}
      </button>
    </motion.form>
  );
}