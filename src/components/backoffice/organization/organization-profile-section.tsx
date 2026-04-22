"use client";

import { FormEvent, useEffect, useState } from "react";

import type { OrganizationProfile, UpdateOrganizationProfilePayload } from "@/types/organization";

type OrganizationProfileSectionProps = {
  profile: OrganizationProfile | null;
  loading: boolean;
  error: string | null;
  onUpdateProfile: (payload: UpdateOrganizationProfilePayload) => Promise<void>;
};

export function OrganizationProfileSection({
  profile,
  loading,
  error,
  onUpdateProfile,
}: OrganizationProfileSectionProps) {
  const [editing, setEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState<UpdateOrganizationProfilePayload>({
    firstName: profile?.firstName ?? "",
    lastName: profile?.lastName ?? "",
    phone: profile?.phone ?? "",
    email: profile?.email ?? "",
  });

  useEffect(() => {
    setForm({
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
      phone: profile?.phone ?? "",
      email: profile?.email ?? "",
    });
  }, [profile]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const payload: UpdateOrganizationProfilePayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      ...(form.email?.trim() ? { email: form.email.trim() } : {}),
    };

    if (!payload.firstName || !payload.lastName || !payload.phone) {
      setSubmitError("Prénom, nom et téléphone sont requis.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdateProfile(payload);
      setEditing(false);
    } catch (updateError) {
      if (updateError instanceof Error) {
        setSubmitError(updateError.message || "Impossible de mettre à jour le profil.");
      } else {
        setSubmitError("Impossible de mettre à jour le profil.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Mon profil</h2>
        {profile ? (
          <button
            type="button"
            onClick={() => setEditing((current) => !current)}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Modifier mon profil
          </button>
        ) : null}
      </div>

      {loading ? <p className="mt-4 text-sm text-slate-500">Chargement du profil...</p> : null}
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      {!loading && !error && !profile ? (
        <p className="mt-4 text-sm text-slate-500">Profil indisponible pour le moment.</p>
      ) : null}

      {!loading && !error && profile && !editing ? (
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Prénom:</span> {profile.firstName}
          </p>
          <p>
            <span className="font-semibold">Nom:</span> {profile.lastName}
          </p>
          <p>
            <span className="font-semibold">Téléphone:</span> {profile.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {profile.email || "-"}
          </p>
        </div>
      ) : null}

      {!loading && !error && profile && editing ? (
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
            placeholder="Email"
            value={form.email || ""}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />

          {submitError ? <p className="text-sm text-red-600 sm:col-span-2">{submitError}</p> : null}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
