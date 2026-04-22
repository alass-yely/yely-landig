"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { registerOrganizationOwner } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/client";
import { normalizePhone } from "@/lib/utils/phone";
import { setStoredSession } from "@/lib/utils/session";
import type { AuthOrganization, RegisterOrganizationOwnerPayload } from "@/types/auth";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organizationName: string;
  rccm: string;
  vehicleCount: string;
  pin: string;
};

const PIN_REGEX = /^\d{4}$/;
const DEFAULT_ERROR_MESSAGE = "Une erreur est survenue. Veuillez reessayer.";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFriendlyErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("phone") || normalized.includes("telephone")) {
    return "Ce numero de telephone est deja utilise.";
  }

  if (normalized.includes("email")) {
    return "Cet email est deja utilise.";
  }

  if (normalized.includes("rccm")) {
    return "Ce RCCM est deja utilise.";
  }

  if (normalized.includes("payload") || normalized.includes("invalid")) {
    return "Les informations saisies sont invalides. Verifiez les champs et reessayez.";
  }

  return message || DEFAULT_ERROR_MESSAGE;
}

function toStoredOrganization(organization: AuthOrganization): AuthOrganization {
  return {
    id: organization.id,
    name: organization.name,
    rccm: organization.rccm,
    affiliationCode: organization.affiliationCode,
    vehicleCount: organization.vehicleCount,
  };
}

export function OrganizationRegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organizationName: "",
    rccm: "",
    vehicleCount: "",
    pin: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValid = useMemo(() => {
    const hasRequiredFields =
      form.firstName.trim().length > 0 &&
      form.lastName.trim().length > 0 &&
      form.phone.trim().length > 0 &&
      form.email.trim().length > 0 &&
      form.organizationName.trim().length > 0 &&
      form.rccm.trim().length > 0 &&
      form.pin.trim().length > 0;

    if (!hasRequiredFields) return false;

    if (!isValidEmail(form.email.trim())) return false;

    if (!PIN_REGEX.test(form.pin.trim())) return false;

    if (form.vehicleCount.trim()) {
      const parsed = Number(form.vehicleCount);
      if (!Number.isInteger(parsed) || parsed < 0) return false;
    }

    return true;
  }, [form]);

  function updateField(field: keyof FormState, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const organizationName = form.organizationName.trim();
    const rccm = form.rccm.trim();
    const pin = form.pin.trim();
    const vehicleCountRaw = form.vehicleCount.trim();

    if (!firstName) {
      setErrorMessage("Le prenom du responsable est requis.");
      return;
    }

    if (!lastName) {
      setErrorMessage("Le nom du responsable est requis.");
      return;
    }

    if (!phone) {
      setErrorMessage("Le telephone est requis.");
      return;
    }

    if (!email) {
      setErrorMessage("L'email est requis.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Adresse email invalide.");
      return;
    }

    if (!organizationName) {
      setErrorMessage("Le nom de l'organisation est requis.");
      return;
    }

    if (!rccm) {
      setErrorMessage("Le RCCM est requis.");
      return;
    }

    if (!PIN_REGEX.test(pin)) {
      setErrorMessage("Le PIN doit contenir exactement 4 chiffres.");
      return;
    }

    let vehicleCount: number | undefined;
    if (vehicleCountRaw) {
      const parsed = Number(vehicleCountRaw);
      if (!Number.isInteger(parsed) || parsed < 0) {
        setErrorMessage("Le nombre de vehicules doit etre un entier positif.");
        return;
      }
      vehicleCount = parsed;
    }

    const payload: RegisterOrganizationOwnerPayload = {
      firstName,
      lastName,
      phone: normalizePhone(phone),
      email,
      pin,
      organizationName,
      rccm,
      ...(vehicleCount !== undefined ? { vehicleCount } : {}),
    };

    setIsSubmitting(true);

    try {
      const response = await registerOrganizationOwner(payload);
      const session = response.data;

      setStoredSession({
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        user: session.user,
        organization: toStoredOrganization(session.organization),
      });
      const query = new URLSearchParams({ type: "organization" });
      router.push(`/success?${query.toString()}`);
    } catch (error) {
      if (error instanceof ApiClientError) {
        setErrorMessage(getFriendlyErrorMessage(error.message));
      } else if (error instanceof Error) {
        setErrorMessage(getFriendlyErrorMessage(error.message));
      } else {
        setErrorMessage(DEFAULT_ERROR_MESSAGE);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
            Prenom du responsable
          </label>
          <input
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder="Ex: Awa"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">
            Nom du responsable
          </label>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            placeholder="Ex: Kouadio"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
          Telephone
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={14}
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, ""))}
          placeholder="Ex: 0700000000"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-slate-700">
          Email professionnel
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="Ex: contact@entreprise.ci"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="organizationName" className="text-sm font-semibold text-slate-700">
          Nom de l'organisation
        </label>
        <input
          id="organizationName"
          type="text"
          value={form.organizationName}
          onChange={(event) => updateField("organizationName", event.target.value)}
          placeholder="Ex: YELY Transport"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="rccm" className="text-sm font-semibold text-slate-700">
            RCCM
          </label>
          <input
            id="rccm"
            type="text"
            value={form.rccm}
            onChange={(event) => updateField("rccm", event.target.value)}
            placeholder="Ex: CI-ABJ-2026-B-00001"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="vehicleCount" className="text-sm font-semibold text-slate-700">
            Nombre de vehicules (optionnel)
          </label>
          <input
            id="vehicleCount"
            type="number"
            inputMode="numeric"
            min={0}
            value={form.vehicleCount}
            onChange={(event) => updateField("vehicleCount", event.target.value)}
            placeholder="Ex: 24"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="pin" className="text-sm font-semibold text-slate-700">
          PIN (exactement 4 chiffres)
        </label>
        <input
          id="pin"
          type="password"
          inputMode="numeric"
          minLength={4}
          maxLength={4}
          value={form.pin}
          onChange={(event) => updateField("pin", event.target.value.replace(/\D/g, ""))}
          placeholder="1234"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm tracking-[0.25em] text-slate-900 placeholder:tracking-normal placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creation du compte..." : "Creer mon compte organisation"}
      </button>
    </form>
  );
}
