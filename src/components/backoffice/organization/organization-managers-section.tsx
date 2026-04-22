"use client";

import { FormEvent, useState } from "react";

import type { CreateOrganizationManagerPayload, OrganizationManagerListItem } from "@/types/organization";

type OrganizationManagersSectionProps = {
  managers: OrganizationManagerListItem[];
  loading: boolean;
  error: string | null;
  onCreateManager: (payload: CreateOrganizationManagerPayload) => Promise<void>;
};

type ManagerForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export function OrganizationManagersSection({
  managers,
  loading,
  error,
  onCreateManager,
}: OrganizationManagersSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<ManagerForm>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload: CreateOrganizationManagerPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      ...(form.email.trim() ? { email: form.email.trim() } : {}),
    };

    if (!payload.firstName || !payload.lastName || !payload.phone) {
      setFormError("Les champs prénom, nom et téléphone sont requis.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateManager(payload);
      setForm({ firstName: "", lastName: "", phone: "", email: "" });
      setShowForm(false);
    } catch (submitError) {
      if (submitError instanceof Error) {
        setFormError(submitError.message || "Impossible de créer le manager.");
      } else {
        setFormError("Impossible de créer le manager.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Managers</h2>
        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Créer un manager
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Prénom"
            value={form.firstName}
            onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Nom"
            value={form.lastName}
            onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email (optionnel)"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />

          {formError ? <p className="text-sm text-red-600 sm:col-span-2">{formError}</p> : null}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting ? "Création..." : "Valider"}
            </button>
          </div>
        </form>
      ) : null}

      {loading ? <p className="mt-4 text-sm text-slate-500">Chargement des managers...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {!loading && !error && managers.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">Aucun manager pour le moment.</p>
      ) : null}

      {!loading && !error && managers.length > 0 ? (
        <ul className="mt-4 space-y-3">
          {managers.map((manager) => (
            <li key={manager.id} className="rounded-xl border border-slate-200 p-3 text-sm">
              <p className="font-semibold text-slate-900">
                {manager.firstName} {manager.lastName}
              </p>
              <p className="text-slate-600">{manager.phone || "-"}</p>
              <p className="text-xs text-slate-500">{manager.email || "-"}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
