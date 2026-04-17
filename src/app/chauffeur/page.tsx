import { DriverDashboard } from "@/components/driver/driver-dashboard";

type ChauffeurPageProps = {
  searchParams?: Promise<{
    aff?: string;
    referralCode?: string;
  }>;
};

export default async function ChauffeurPage({ searchParams }: ChauffeurPageProps) {
  const params = await searchParams;
  const aff = params?.aff ?? "";
  const referralCode = params?.referralCode ?? "";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">Espace Chauffeur</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Votre tableau de bord
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Retrouvez vos informations principales, votre cashback total et vos dernieres transactions.
          </p>
        </div>

        <DriverDashboard affiliationCode={aff} initialReferralCode={referralCode} />
      </div>
    </section>
  );
}
