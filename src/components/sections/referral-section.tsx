"use client";

import { motion } from "framer-motion";
import { Share2, Users2, Trophy, Link as LinkIcon } from "lucide-react";

export function ReferralSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 lg:py-32">
      {/* Background Decor */}
      <div className="absolute left-0 top-0 h-full w-full opacity-10">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#0f9b58] blur-[120px]" />
        <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-blue-600 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold uppercase tracking-[0.2em] text-[#0f9b58]">Parrainage</h2>
          <p className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Inviter vos amis, <span className="text-[#0f9b58]">augmenter vos bonus.</span>
          </p>
        </div>

      {/* Visualisation des Paliers de Gains */}
      <div className="mb-20">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-white/5 border border-white/10 p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* fait ici quelque chose qui s'accorde avec le paragraphe en dessous */}
            {/* Visualisation des Paliers de Gains */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full">
              
              {/* Calculateur Dynamique / Statut */}
              <div className="flex-1 w-full space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white">Vos gains potentiels</h4>
                    <p className="text-slate-400 text-sm">Basé sur vos 3 dernières invitations</p>
                  </div>
                  <div className="bg-[#0f9b58]/10 border border-[#0f9b58]/20 rounded-lg px-3 py-1">
                    <span className="text-[#0f9b58] font-mono font-bold">+1,500 YP</span>
                  </div>
                </div>
                
                {/* Barre de progression style "Énergie" */}
                <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute h-full bg-gradient-to-r from-emerald-600 to-[#0f9b58] shadow-[0_0_15px_rgba(15,155,88,0.5)]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">1 Ami</p>
                    <p className="text-sm font-bold text-white">500 pts</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">5 Amis</p>
                    <p className="text-sm font-bold text-white text-[#0f9b58]">2,500 pts</p>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">10 Amis</p>
                    <p className="text-sm font-bold text-white">5,000 pts</p>
                  </div>
                </div>
              </div>

              {/* Séparateur minimaliste */}
              <div className="hidden md:block h-24 w-px bg-white/10" />

              {/* Widget "Total Accumulé" visuel */}
              <div className="relative flex flex-col items-center justify-center p-6 min-w-[180px]">
                <div className="absolute inset-0 bg-[#0f9b58]/5 blur-2xl rounded-full" />
                <Trophy size={40} className="text-[#0f9b58] mb-3 opacity-80" />
                <span className="text-4xl font-black text-white tracking-tight">500</span>
                <span className="text-[10px] font-bold text-[#0f9b58] uppercase tracking-[0.2em] mt-1">YP / Inscription</span>
              </div>
            </div>

          </div>
          
          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            * gagne 500 (Yely Points) pour chaque personne inscrite via ton code.
          </p>
        </div>
      </div>


        <div className="grid ">
          {/* Carte Parrainage Chauffeur */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-4xl bg-white/5 border border-white/10 p-8 lg:p-12 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f9b58]/20 text-[#0f9b58]">
                <Share2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Parrainage Chauffeur</h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              Partagez votre code de parrainage avec d&apos;autres chauffeurs. Chaque inscription validée vous rapporte des bonus supplémentaires.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Code unique de parrainage",
                "Suivi des invitations en temps réel",
                "Bonus activés dès l'inscription du filleul"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Trophy size={16} className="text-[#0f9b58]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-4 border border-white/5">
              <span className="text-xs font-mono text-slate-500 italic">Exemple : YELY-CH-2024</span>
              <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <LinkIcon size={14} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
