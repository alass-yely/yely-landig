"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, MessageCircle } from "lucide-react";

export function HowItWorksSection() {
  const WHATSAPP_LINK = "https://chat.whatsapp.com/BtUsQVPD9LE4axCL8MpzeF?mode=gi_t";
  
  const faqs = [
    { question: "Dans quelles stations YELY est disponible ?", response: "YELY est partenaire des stations-service que tu utilises tous les jours en Côte d’Ivoire (Disponibilité progressive, sous réserve d’accord avec les stations-service partenaires.)" },
    { question: "Je dois déposer de l’argent ?", response: "Absolument pas. YELY n'est pas un compte de dépôt, c'est un programme de fidélité gratuit." },
    { question: "Je dois changer d'application Yango ?", response: "Non, tu continues d'utiliser ton application habituelle sans rien changer à tes habitudes." },
    { question: "C'est payant ?", response: "L'adhésion et l'utilisation de YELY sont 100% gratuites pour tous les chauffeurs." },
    { question: "Je peux utiliser mes bonus quand je veux ?", response: "Oui, tes avantages sont disponibles dès qu'ils sont crédités sur ton compte." },
    { question: "Je peux utiliser YELY quand je veux ?", response: "Le service est disponible 24h/24 et 7j/7 dans toutes les stations partenaires." },
    { question: "On va me prendre de l’argent ?", response: "Aucun frais caché, aucun prélèvement. Nous sommes là pour te faire économiser, pas l'inverse." },
    { question: "C’est compliqué ?", response: "C'est ultra simple. Une présentation rapide et tu es prêt à profiter des avantages." },
    { question: "Ça prend du temps ?", response: "L'activation se fait en quelques minutes seulement." }
  ];

  return (
    <section className="bg-slate-50 py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0f9b58] bg-[#0f9b58]/10 rounded-full"
          >
            FAQ Rapide
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Tu te poses peut-être <br className="hidden sm:block" /> 
            <span className="text-[#0f9b58]">ces questions ?</span>
          </motion.h2>
        </div>

        {/* FAQ Grid/List */}
        <div className="grid gap-4 md:grid-cols-1 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 text-center max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Encore un doute ?</h3>
            <p className="text-slate-500 mb-8">Rejoins notre communauté pour poser tes questions directement aux autres chauffeurs et à l&apos;équipe.</p>
            
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#0f9b58] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#0f9b58]/30 transition-all hover:bg-[#0b7a45] hover:-translate-y-1 active:scale-95"
            >
              <MessageCircle size={24} />
              Rejoindre le groupe WhatsApp
              <ArrowUpRight size={20} className="opacity-70" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FaqItem({ faq, index }: { faq: { question: string; response: string }, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen ? "bg-white border-[#0f9b58] shadow-md" : "bg-white/50 border-slate-200 hover:border-slate-300"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`text-base font-bold transition-colors ${isOpen ? "text-[#0f9b58]" : "text-slate-800"}`}>
          {faq.question}
        </span>
        <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <ChevronDown size={20} className={isOpen ? "text-[#0f9b58]" : "text-slate-400"} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-1">
              {faq.response}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}