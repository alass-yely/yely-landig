"use client";

import { motion } from "framer-motion";
import { QrCode, Zap, CheckCircle2, Fuel, ArrowRight, } from "lucide-react";
import Link from "next/link";

const flow = [
  {
    title: "Faites votre plein",
    desc: "Servez-vous normalement dans n'importe quelle station partenaire YELY.",
    icon: <Fuel size={24} />,
  },
  {
    title: "Payer comme d’habitude",
    desc: "Payez avec votre mobile money ou en espèces.",
    icon: <Fuel size={24} />,
  },
  {
    title: "Présentez votre QR",
    desc: "Depuis l'application YELY.",
    icon: <QrCode size={24} />,
  },
  {
    title: "Scan instantané",
    desc: "Le pompiste scanne et valide les litres en moins de 3 secondes et tu gagnes des bonus automatiquement, versés instantanément sur ton compte YELY",
    icon: <Zap size={24} />,
  },
  {
    title: "Gain validé",
    desc: "Vous pouvez utiliser vos bonus quand vous le voulez.",
    icon: <CheckCircle2 size={24} />,
  },
];

export function StationExperience() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f9b58]">Comment ça marche ?</h2>
          <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Zéro attente, 100% de gains
          </p>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Ce n’est pas un nouveau partenaire, ce n’est pas du Mobile Money. Tu ne changes pas tes habitudes, tu gagnes simplement des bonus en plus
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {flow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-center text-center"
            >
              {/* Connecteur entre les étapes (Desktop) */}
              {index < flow.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-100 z-0" />
              )}
              
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-[#0f9b58] shadow-inner">
                {item.icon}
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Note de rassurance */}
        <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center"
      >
        <Link
          href="/register?role=chauffeur"
          className="group flex items-center gap-3 rounded-full bg-[#0f9b58] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#0f9b58]/20 transition-all hover:bg-[#0b7a45] hover:shadow-xl active:scale-95"
        >
          Commencer à gagner des bonus
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
        {/* <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-[#0f9b58] animate-pulse" />
            Compatible avec toutes nos stations partenaires à Abidjan et à l&apos;intérieur.
          </div>
        </div> */}
      </div>
    </section>
  );
}
