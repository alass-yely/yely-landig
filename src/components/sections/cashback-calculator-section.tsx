"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { track } from "@/lib/tracking/events";

export function CashbackCalculator() {
  // Valeurs par défaut (à ajuster selon tes futurs partenariats)
  const CASHBACK_PER_LITRE = 10; // ex: 10 FCFA par litre
  const [litres, setLitres] = useState(50);

  const monthlyGains = litres * CASHBACK_PER_LITRE * 26; // 26 jours travaillés

  // Dans CashbackCalculator.tsx
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  setLitres(value);
  // On track quand l'utilisateur simule ses gains
  track("calculator_used", { litres: value });
  };


  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-slate-900 p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Décoration subtile */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f9b58]/10 blur-3xl rounded-full" />

          <div className="relative z-10 grid gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 text-[#0f9b58] mb-4">
                <Calculator size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Simulateur de gains</span>
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                Combien allez-vous <span className="text-[#0f9b58]">récupérer</span> par mois ?
              </h2>
              <p className="mt-4 text-slate-400">
                Ajustez votre consommation moyenne journalière pour estimer votre cashback mensuel avec YELY.
              </p>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-medium text-slate-300">Consommation / jour</label>
                  <span className="text-[#0f9b58] font-bold">{litres} Litres</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={litres}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#0f9b58]"
                />
                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold uppercase">
                  <span>10L</span>
                  <span>100L</span>
                  <span>200L</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center">
                <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Gain estimé par mois</p>
                <div className="text-4xl font-black text-white">
                  {monthlyGains.toLocaleString()} <span className="text-[#0f9b58] text-xl">FCFA</span>
                </div>
                <p className="mt-4 text-[10px] text-slate-500 italic">
                  *Basé sur une moyenne de 26 jours de service / mois.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
