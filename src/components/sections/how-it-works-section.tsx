"use client";

import { motion } from "framer-motion";
import { ArrowRight, UserPlus, QrCode, TrendingUp, Gift } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Inscription simplifiée",
    description: "Le chauffeur crée son compte en quelques minutes via la plateforme YELY.",
    icon: <UserPlus className="text-[#0f9b58]" size={24} />,
    color: "bg-emerald-50",
  },
  {
    title: "Accès aux outils",
    description: "Réception immédiate du QR code et des outils de suivi pour démarrer.",
    icon: <QrCode className="text-blue-600" size={24} />,
    color: "bg-blue-50",
  },
  {
    title: "Enregistrement des trajets",
    description: "Chaque litre consommé est suivi pour enrichir votre historique de performance.",
    icon: <TrendingUp className="text-orange-600" size={24} />,
    color: "bg-orange-50",
  },
  {
    title: "Encaissement du cashback",
    description: "Profitez de vos récompenses basées sur votre consommation réelle.",
    icon: <Gift className="text-purple-600" size={24} />,
    color: "bg-purple-50",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-slate-50/50 py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f9b58]">Parcours Chauffeur</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Boostez vos revenus en 4 étapes
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl border border-white bg-white p-8 shadow-sm transition-all hover:shadow-xl lg:odd:-translate-y-4"
            >
              {/* Numéro d'étape discret */}
              <span className="absolute right-6 top-6 text-4xl font-black text-slate-50 transition-colors group-hover:text-emerald-50">
                0{index + 1}
              </span>

              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} mb-6`}>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>

              {/* Petite flèche décorative pour desktop */}
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden lg:block">
                  <div className="h-px w-8 bg-slate-100" />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
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
          Commencer à gagner du cashback
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

    </section>
  );
}
