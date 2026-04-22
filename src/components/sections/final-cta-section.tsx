"use client";
import { motion } from "framer-motion";
import { Smartphone, Store, ShieldCheck, QrCode } from "lucide-react";

export function AppTeasingSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Tu es chauffeur ou livreur, YELY c’est :</h2>
          <p className="mt-4 text-lg text-slate-600">Trois interfaces conçues pour une transparence totale dès le lancement.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <TeaserCard 
            title="Application gratuite" 
            desc="Sans frais, sans commission, aucun dépôt d’argent nécessaire."
            icon={<Smartphone className="text-[#0f9b58]" />}
          />
          <TeaserCard 
            title="Ton QR code" 
            desc="Pour scanner à la station."
            icon={<QrCode className="text-blue-600" />}
          />
          <TeaserCard 
            title="Des bonus" 
            desc="Sur chaque litre, versés instantanément."
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
