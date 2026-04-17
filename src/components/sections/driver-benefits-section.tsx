"use client";

import { motion } from "framer-motion";
import { Building2, Users, BarChart3, Wallet } from "lucide-react";
import Link from "next/link";

const orgSteps = [
  {
    title: "Enregistrement Flotte",
    description: "Créez le profil de votre organisation et configurez vos paramètres de suivi.",
    icon: <Building2 className="text-slate-700" size={24} />,
    color: "bg-slate-100",
  },
  {
    title: "Rattachement Chauffeurs",
    description: "Invitez vos chauffeurs à rejoindre votre réseau YELY pour centraliser les données.",
    icon: <Users className="text-slate-700" size={24} />,
    color: "bg-slate-100",
  },
  {
    title: "Pilotage & Analytics",
    description: "Visualisez la consommation globale et identifiez les leviers d'optimisation.",
    icon: <BarChart3 className="text-slate-700" size={24} />,
    color: "bg-slate-100",
  },
  {
    title: "Optimisation des Coûts",
    description: "Réduisez vos dépenses grâce au suivi précis et au cashback cumulé par votre flotte.",
    icon: <Wallet className="text-slate-700" size={24} />,
    color: "bg-slate-100",
  },
];

export function HowItWorksOrgSection() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-500">Pour les Organisations</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Maîtrisez votre budget carburant
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {orgSteps.map((step, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-3xl border border-slate-100 bg-slate-50/30 p-8 transition-all hover:bg-white hover:shadow-xl lg:even:-translate-y-4"
            >
              {/* Numéro d'étape */}
              <span className="absolute right-6 top-6 text-4xl font-black text-slate-100 transition-colors group-hover:text-slate-200">
                0{index + 1}
              </span>

              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} mb-6 shadow-inner`}>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                {step.description}
              </p>
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
          href="/register?role=organisation"
          className="group flex items-center gap-3 rounded-full border-2 border-slate-900 bg-slate-900 px-10 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
        >
          Inscrire mon organisation
          <Building2 size={20} className="text-slate-400" />
        </Link>
      </motion.div>
    </section>
  );
}
