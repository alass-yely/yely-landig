"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, SearchCheck, FileBarChart, Building2 } from "lucide-react";
import Link from "next/link";

const trustFeatures = [
  {
    title: "Données Certifiées",
    desc: "Chaque litre est validé par l'agent de la station partenaire. Aucun ajout manuel possible par le chauffeur.",
    icon: <ShieldCheck size={24} />,
  },
  {
    title: "Suivi en Temps Réel",
    desc: "Soyez notifié dès qu'un plein est effectué. Gardez un œil sur votre flotte, où que vous soyez.",
    icon: <Eye size={24} />,
  },
  {
    title: "Détection d'Anomalies",
    desc: "Notre algorithme repère les consommations inhabituelles ou les pleins suspects automatiquement.",
    icon: <SearchCheck size={24} />,
  },
];

export function TrustSafetySection() {
  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Texte et Argumentaire */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-500 mb-4">Propriétaire ou gestionnaire de véhicules </h2> 
            <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              Tu gères plusieurs <span className="text-[#0f9b58]">véhicules?</span> YELY est fait pour toi
            </h3>
            <p className="mt-6 text-lg text-slate-600">
              Avec YELY, gagne de l’argent à chaque fois que tes véhicules prennent du carburant, gratuitement, sans rien gérer et sans changer ton fonctionnement
            </p>
            
            <div className="mt-10 space-y-8">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#0f9b58]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{feature.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visuel "Preuve de contrôle" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-4xl bg-slate-900 p-8 shadow-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white pb-4 border-b border-white/10">
                  <span className="text-sm font-medium">Activité Récente Flotte</span>
                  <span className="text-[10px] bg-[#0f9b58] px-2 py-1 rounded-full">LIVE</span>
                </div>
                
                {/* Simulation de log de contrôle */}
                {[
                  { car: "Véhicule 04", qty: "45L", status: "Certifié", time: "Il y a 5 min" },
                  { car: "Véhicule 12", qty: "32L", status: "Certifié", time: "Il y a 14 min" },
                  { car: "Véhicule 07", qty: "60L", status: "Vérification", time: "Il y a 1h" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-sm font-bold text-white">{log.car}</p>
                      <p className="text-[10px] text-slate-400">{log.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#0f9b58]">{log.qty}</p>
                      <p className={`text-[9px] font-bold uppercase tracking-tighter ${log.status === 'Certifié' ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {log.status}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 rounded-xl bg-[#0f9b58]/10 border border-[#0f9b58]/20">
                  <p className="text-xs text-emerald-100 text-center italic">
                    &quot;Grâce à YELY, j&apos;ai réduit mes pertes de carburant de 12% dès le premier mois.&quot;
                  </p>
                </div>
              </div>
            </div>
            
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -left-6 bg-white shadow-xl p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Fraude évitée</p>
                <p className="text-sm font-black text-slate-900">Zéro manipulation</p>
              </div>
            </div>
          </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-2 flex justify-center"
      >
        <Link
          href="/register?role=organisation"
          className="group flex items-center gap-3 rounded-full border-2 border-slate-900 bg-slate-900 px-10 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-95"
        >
          Inscrire ma flotte
          <Building2 size={20} className="text-slate-400" />
        </Link>
      </motion.div>
        </div>
      </div>
    </section>
  );
}
