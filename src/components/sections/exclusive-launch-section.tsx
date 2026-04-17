"use client";

import { motion } from "framer-motion";
import { Flame, ArrowRight } from "lucide-react";

export function ExclusiveLaunchSection() {
  const WHATSAPP_LINK = "https://wa.me"; // Ton lien

  return (
    <section className="py-20 bg-emerald-900 relative overflow-hidden">
      {/* Animation de fond pour le côté "Urgent/Énergie" */}
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#0f9b58] blur-[120px] rounded-full"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-emerald-200 border border-white/10 mb-8">
          <Flame size={16} className="text-orange-400" />
          ACCÈS PRIORITAIRE : 100 PREMIÈRES PLACES
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
          Soyez parmi les pionniers de la <br />
          <span className="text-[#0f9b58]">révolution YELY en Côte d&apos;Ivoire.</span>
        </h2>

        <p className="mt-6 text-lg text-emerald-100/80">
          Nous limitons volontairement les premières inscriptions pour offrir un accompagnement personnalisé et des bonus de cashback doublés aux 100 premiers chauffeurs et 10 premières organisations.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <StatBox label="Places restantes" value="42" sub="Inscrivez-vous vite" />
          <StatBox label="Bonus Lancement" value="X2" sub="Sur votre 1er mois" />
          <StatBox label="Statut" value="Bêta" sub="Ouvert à Abidjan" />
        </div>

        <div className="mt-12">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-xl font-black text-[#0f9b58] shadow-2xl transition-all hover:bg-emerald-50 hover:scale-105 active:scale-95"
          >
            Réserver ma place sur WhatsApp
            <ArrowRight className="transition-transform group-hover:translate-x-2" />
          </a>
          <p className="mt-4 text-sm text-emerald-300/60 font-medium">
            * L&apos;inscription est 100% gratuite et sans engagement.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-1">{label}</p>
      <p className="text-4xl font-black text-white mb-1">{value}</p>
      <p className="text-[10px] text-emerald-100/50 uppercase font-bold">{sub}</p>
    </div>
  );
}
