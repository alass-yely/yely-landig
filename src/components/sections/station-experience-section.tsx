"use client";

import { motion } from "framer-motion";
import { QrCode, Zap, CheckCircle2, Fuel, ArrowRight, Wallet2 } from "lucide-react";
import Link from "next/link";

const flow = [
  {
    title: "Faites votre plein",
    desc: "Servez-vous normalement dans n'importe quelle station partenaire YELY.",
    icon: <Fuel size={24} />,
  },
  {
    title: "Payer normalement",
    desc: "Utilisez votre Mobile Money ou payez en espèces, comme toujours.",
    icon: <Wallet2 size={24} />, // Icône ajoutée ici
  },
  {
    title: "Présentez votre QR",
    desc: "Ouvrez l'application YELY et montrez votre QR code.",
    icon: <QrCode size={24} />,
  },
  {
    title: "Scan instantané",
    desc: "Le pompiste scanne en 3s. Vos bonus sont versés immédiatement sur votre compte YELY.",
    icon: <Zap size={24} />,
  },
  {
    title: "Gain validé",
    desc: "Utilisez vos bonus cumulés quand vous le souhaitez.",
    icon: <CheckCircle2 size={24} />,
  },
];

export function StationExperience() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#0f9b58] bg-emerald-50 px-4 py-2 rounded-full">
            Comment ça marche ?
          </span>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Zéro attente, <span className="text-[#0f9b58]">100% de gains</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            Ce n’est pas un nouveau partenaire, ce n’est pas du Mobile Money. Tu ne changes pas tes habitudes, tu gagnes simplement des bonus en plus
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Ligne de connexion (Desktop uniquement) */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-100" />

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
            {flow.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Numéro de l'étape */}
                <span className="absolute -top-4 text-6xl font-black text-slate-50 opacity-[0.03] select-none">
                  0{index + 1}
                </span>

                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 text-[#0f9b58] group-hover:scale-110 group-hover:bg-[#0f9b58] group-hover:text-white transition-all duration-300 z-10">
                  {item.icon}
                </div>
                
                <h3 className="text-md font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-[13px] leading-relaxed text-slate-500 px-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA et Note de rassurance */}
        <div className="mt-24 flex flex-col items-center gap-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/register?role=chauffeur"
              className="group flex items-center gap-3 rounded-full bg-slate-900 px-10 py-5 text-base font-bold text-white shadow-2xl transition-all hover:bg-black"
            >
              Commencer à gagner des bonus
              <ArrowRight size={20} className="text-[#0f9b58] transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-slate-100 bg-slate-50/50">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white" />
              ))}
            </div>
            <p className="text-[12px] font-medium text-slate-600">
              Déjà <span className="font-bold text-slate-900">+500 chauffeurs</span> à Abidjan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}