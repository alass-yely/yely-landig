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
            
            {/* Palier 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700 transition-colors group-hover:border-[#0f9b58]">
                <span className="text-xl font-bold text-white">5</span>
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#0f9b58] flex items-center justify-center text-[10px] text-white font-bold">Lvl 1</div>
              </div>
              <p className="text-sm font-semibold text-slate-300">Filleuls</p>
              <p className="text-xs text-[#0f9b58] font-bold">+2% Cashback</p>
            </motion.div>

            {/* Ligne de connexion */}
            <div className="hidden md:block h-px w-full bg-linear-to-r from-transparent via-slate-700 to-transparent" />

            {/* Palier 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 border-2 border-[#0f9b58] shadow-[0_0_20px_rgba(15,155,88,0.2)]">
                <span className="text-2xl font-bold text-white">15</span>
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#0f9b58] flex items-center justify-center text-[10px] text-white font-bold">Lvl 2</div>
              </div>
              <p className="text-sm font-semibold text-slate-300">Filleuls</p>
              <p className="text-xs text-[#0f9b58] font-bold">+5% Cashback</p>
            </motion.div>

            {/* Ligne de connexion */}
            <div className="hidden md:block h-px w-full bg-linear-to-r from-transparent via-slate-700 to-transparent" />

            {/* Palier 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 border-2 border-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
                <Trophy className="text-yellow-500" size={32} />
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center text-[10px] text-black font-bold">PRO</div>
              </div>
              <p className="text-sm font-semibold text-slate-300">30+ Filleuls</p>
              <p className="text-xs text-yellow-500 font-bold">Bonus Illimité</p>
            </motion.div>

          </div>
          
          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            * Les taux de cashback augmentent proportionnellement au volume de litres tracés par votre réseau.
          </p>
        </div>
      </div>


        <div className="grid gap-8 lg:grid-cols-2">
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

          {/* Carte Affiliation Organisation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-4xl bg-white/5 border border-white/10 p-8 lg:p-12 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400">
                <Users2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Affiliation Organisation</h3>
            </div>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              Digitalisez votre réseau. Utilisez votre code d&apos;affiliation pour rattacher automatiquement les inscriptions à votre flotte et suivre leur croissance.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Tracking centralisé des affiliés",
                "Visualisation de la croissance du réseau",
                "Tableau de bord dédié aux performances"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Trophy size={16} className="text-blue-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 p-4 border border-white/5">
              <span className="text-xs font-mono text-slate-500 italic">Exemple : ORG-NOM-VOTRE-VILLE</span>
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
