import Link from "next/link";

import { AuthRedirect } from "@/components/auth/auth-redirect";
import { DriverRegisterForm } from "@/components/forms/driver-register-form";

type RegisterPageProps = {
  searchParams?: Promise<{
    ref?: string;
    aff?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const ref = params?.ref ?? "";
  const aff = params?.aff ?? "";

  return (
    <AuthRedirect>
      <section className="bg-slate-50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Inscription Chauffeur</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Creez votre compte chauffeur YELY
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Completez ce formulaire pour rejoindre la plateforme. Vous pouvez renseigner un code de parrainage si vous en avez un.
            </p>

            {aff ? (
              <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Invitation organisation</p>
                <p className="mt-1 text-sm text-blue-900">
                  Vous arrivez depuis un lien d&apos;organisation. Votre code d&apos;affiliation sera appliqué automatiquement après création de compte.
                </p>
              </div>
            ) : null}

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900">A propos des codes</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Le code de parrainage est optionnel. Si vous arrivez depuis un lien avec un parametre ref, le champ est pre-rempli automatiquement.
                Si le parametre aff est present, le rattachement a l&apos;organisation est tente automatiquement apres l&apos;inscription.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Deja inscrit ? Se connecter
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <DriverRegisterForm initialReferralCode={ref} affiliationCode={aff} />
          </div>
        </div>
      </section>
    </AuthRedirect>
  );
}
