import Link from "next/link";

type SuccessPageProps = {
  searchParams?: Promise<{
    firstName?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const firstName = params?.firstName ?? "";
  const hasPersonalMessage = Boolean(firstName);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Succes</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {hasPersonalMessage ? `Bienvenue ${firstName} !` : "Etape terminee"}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Votre compte chauffeur est pret. Accedez a votre espace pour partager votre lien et suivre vos activites.
          </p>
        </div>

        <Link
          href="/chauffeur"
          className="inline-flex items-center justify-center rounded-md bg-[#0f9b58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b7a45]"
        >
          Acceder a mon espace chauffeur
        </Link>
      </div>
    </section>
  );
}
