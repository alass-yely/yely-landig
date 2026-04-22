import Link from "next/link";
import { Building2, ChevronLeft, ShieldCheck, Users } from "lucide-react";

import { AuthRedirect } from "@/components/auth/auth-redirect";
import { OrganizationRegisterForm } from "@/components/forms/organization-register-form";

export default function OrganisationPage() {
  return (
    <AuthRedirect>
      <section className="bg-slate-50">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-8 lg:py-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
            >
              <ChevronLeft size={16} />
              Retour a l'accueil
            </Link>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Inscription Organisation
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Creez votre espace organisation YELY
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Inscrivez votre organisation, creez votre compte proprietaire et preparez l'acces de vos chauffeurs a une gestion carburant plus fiable.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Building2 size={18} />
                </div>
                <p className="text-sm font-semibold text-slate-900">Activation rapide</p>
                <p className="mt-1 text-sm text-slate-600">
                  Creez votre organisation en quelques minutes avec vos informations officielles.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Users size={18} />
                </div>
                <p className="text-sm font-semibold text-slate-900">Base pour votre equipe</p>
                <p className="mt-1 text-sm text-slate-600">
                  Votre compte owner est pret pour commencer a structurer votre espace organisation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-sm font-semibold text-slate-900">Donnees securisees</p>
                <p className="mt-1 text-sm text-slate-600">
                  Vos informations de connexion sont utilisees uniquement pour creer votre session et securiser votre acces.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Inscription du proprietaire</h2>
            <p className="mt-2 text-sm text-slate-600">
              Completez ce formulaire pour ouvrir votre compte organisation.
            </p>

            <div className="mt-6">
              <OrganizationRegisterForm />
            </div>
          </div>
        </div>
      </section>
    </AuthRedirect>
  );
}
