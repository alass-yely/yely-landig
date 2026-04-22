import Link from "next/link";
import { ArrowRight, Building2, Users2, UserCog, Wallet} from "lucide-react";

const valueBlocks = [
  {
    title: "Code d'affiliation unique",
    description: "Attribuez un code exclusif à votre flotte pour un rattachement instantané de vos chauffeurs.",
    icon: Users2,
  },
  {
    title: "Dashboard centralisé",
    description: "Pilotez l'ensemble de votre réseau, suivez les statuts et gérez les activités en temps réel.",
    icon: Building2,
  },
  {
    title: "Délégation Intelligente",
    description: "Structurez votre équipe en créant des comptes managers avec des permissions spécifiques.",
    icon: UserCog,
  },
  {
    title: "Transparence Totale",
    description: "Digitalisez la relation flotte-chauffeur pour une coordination terrain sans friction.",
    icon: Wallet,
  },
];

const steps = [
  { title: "Inscription", desc: "Créez votre compte structure en 2 minutes." },
  { title: "Génération", desc: "Votre code d'affiliation est créé automatiquement." },
  { title: "Invitation", desc: "Partagez le code ou votre lien personnalisé." },
  { title: "Pilotage", desc: "Suivez la croissance de votre flotte en direct." },
];

export default function OrganizationsPage() {
  return (
    <div className="bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-linear-to-b from-emerald-200 via-emerald-50 to-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 mb-6">
              Solution pour flottes & organisations
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
              Gérez votre flotte de chauffeurs <br />
              <span className="text-[#0f9b58]">avec une précision digitale.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-600 mb-10">
              YELY centralise vos opérations. Du recrutement via code d&apos;affiliation au suivi quotidien, 
              donnez à votre organisation les outils qu&apos;elle mérite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/organisation"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#0f9b58] px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-[#0b7a45] hover:-translate-y-0.5 active:scale-95"
              >
                Inscrire mon organisation
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
        {/* Décoration d'arrière-plan (optionnel) */}
        <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div className="aspect-1404/767 w-351 bg-linear-to-tr from-[#80ffdb] to-[#0f9b58] opacity-10"></div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 lg:grid-cols-2">
            {valueBlocks.map((block) => {
              const Icon = block.icon;
              return (
                <div key={block.title} className="relative pl-16 group">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#0f9b58] group-hover:bg-[#0f9b58] group-hover:text-white transition-colors border border-slate-100">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold leading-7 text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">{block.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (Stepped UI) --- */}
      <section className="bg-slate-900 py-24 sm:py-32 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Activation en 4 étapes</h2>
            <p className="text-slate-400 text-lg">Prêt à digitaliser votre flotte ? Voici le parcours.</p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative pt-8 border-t border-slate-700">
                <span className="absolute -top-4 left-0 text-5xl font-black text-emerald-500/20 italic">0{index + 1}</span>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL SECTION --- */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative isolate overflow-hidden bg-[#0f9b58] px-6 py-16 shadow-2xl rounded-3xl sm:px-16 text-center">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Passez à la gestion supérieure.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-emerald-100">
              Rejoignez les organisations qui font confiance à YELY pour structurer leur croissance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/organisation"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#0f9b58] shadow-sm hover:bg-emerald-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
              >
                Inscrire ma structure
              </Link>
            </div>
            {/* Décoration cercle */}
            <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
              <circle cx="512" cy="512" r="512" fill="url(#gradient)" fillOpacity="0.25" />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#white" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}