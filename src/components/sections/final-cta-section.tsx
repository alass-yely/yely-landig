"use client";
import { motion } from "framer-motion";
import { Smartphone, Store, ShieldCheck } from "lucide-react";

export function AppTeasingSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Un écosystème complet en préparation</h2>
          <p className="mt-4 text-lg text-slate-600">Trois interfaces conçues pour une transparence totale dès le lancement.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <TeaserCard 
            title="App Chauffeur" 
            desc="Dashboard, QR code unique et suivi du cashback en temps réel."
            icon={<Smartphone className="text-[#0f9b58]" />}
          />
          <TeaserCard 
            title="App Station" 
            desc="Outil de scan rapide pour valider les transactions et litres servis."
            icon={<Store className="text-blue-600" />}
          />
          <TeaserCard 
            title="Espace Organisation" 
            desc="Gestion de flotte, analytics et optimisation des budgets carburant."
            icon={<ShieldCheck className="text-slate-700" />}
          />
        </div>
      </div>
    </section>
  );
}

function TeaserCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-emerald-50 p-8 transition-all hover:bg-white hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}
