"use client";

import { motion } from "framer-motion";
import { QrCode, ArrowRight, Wallet, Banknote, History, User } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-emerald-200 via-emerald-50 to-white pb-16 pt-8 lg:pb-32 lg:pt-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* TEXTE A GAUCHE */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#0f9b58] mb-6">
              ✨ LANCEMENT PROCHAINEMENT - ABIDJAN
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Gagnez de l&apos;argent sur chaque <span className="text-[#0f9b58]">litre de carburant.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              YELY est la première solution de tracking fuel qui transforme votre consommation en <strong>cashback réel</strong>. Pas de blabla, juste des litres tracés et de l&apos;argent récupéré.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/chauffeur"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#0f9b58] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0f9b58]/20 transition-all hover:bg-[#0b7a45] hover:shadow-xl active:scale-95"
              >
                Je suis chauffeur
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/organisation"
                className="flex items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition-all hover:border-[#0f9b58] hover:text-[#0f9b58]"
              >
                Je suis une organisation
              </Link>
            </div>
          </motion.div>

          {/* DASHBOARD MOBILE A DROITE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Décoration lumineuse derrière le téléphone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-[#0f9b58]/20 blur-[100px] rounded-full" />

            {/* COQUE DU TÉLÉPHONE */}
            <div className="relative z-10 w-72 rounded-[3rem] border-8 border-slate-900 bg-slate-900 p-2 shadow-2xl overflow-hidden ring-1 ring-white/20">
              
              {/* ÉCRAN DE L'APPLICATION (DANS LA COQUE DU TÉLÉPHONE) */}
            <div className="h-150 w-full rounded-[2.2rem] bg-slate-50 overflow-hidden pb-6 relative">
              
              {/* NOTIFICATION ANIMÉE (Apparaît après 2 secondes) */}
              <motion.div
                initial={{ opacity: 0, y: -50, x: "-50%" }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ delay: 2, duration: 0.5, type: "spring" }}
                className="absolute top-4 left-1/2 z-50 w-[90%] rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-sm border-l-4 border-[#0f9b58] flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#0f9b58]">
                  <Banknote size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-[11px] font-black text-slate-800">Cashback Reçu ! ✨</p>
                  <p className="text-[10px] text-slate-500 font-medium">+450 FCFA (Plein 45L)</p>
                </div>
              </motion.div>

              {/* Header App */}
              <div className="bg-[#0f9b58] p-6 pb-12 text-white">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={16}/>
                  </div>
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] font-bold bg-white/20 px-2 py-1 rounded-full uppercase flex items-center gap-1"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Synchronisé
                  </motion.span>
                </div>
                <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Mon Solde</p>
                <div className="flex items-baseline gap-2">
                    <motion.h3 
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ delay: 2.5, duration: 0.3 }}
                      className="text-3xl font-black"
                    >
                        18 450
                    </motion.h3>
                    <span className="text-lg font-bold">FCFA</span>
                </div>
              </div>

              {/* QR CODE CARD */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mx-4 -mt-8 rounded-3xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col items-center relative overflow-hidden"
              >
                {/* Effet de balayage (scan) sur le QR Code */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-0.5 bg-[#0f9b58]/40 shadow-[0_0_10px_#0f9b58] z-20"
                />
                
                <div className="bg-slate-50 p-3 rounded-2xl border-2 border-dashed border-[#0f9b58]/30 mb-3 relative z-10">
                  <QrCode size={120} className="text-slate-900" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Votre identifiant unique</p>
              </motion.div>

                {/* DERNIÈRES TRANSACTIONS */}
                <div className="px-4 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <History size={14} /> Activité
                    </h4>
                    <span className="text-[9px] text-[#0f9b58] font-bold">Voir tout</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { site: "Total Marcory", qty: "45L", gain: "+450", date: "Hier, 18:30" },
                      { site: "Shell Plateau", qty: "30L", gain: "+300", date: "22 Oct, 10:15" },
                      { site: "PretroCI Cocody", qty: "55L", gain: "+550", date: "21 Oct, 14:20" },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#0f9b58]">
                            <Wallet size={14} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-800 leading-none">{tx.site}</p>
                            <p className="text-[9px] text-slate-400 mt-1">{tx.date} • {tx.qty}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-black text-[#0f9b58]">{tx.gain} F</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barre de navigation fictive de l'iPhone */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-300 rounded-full" />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
