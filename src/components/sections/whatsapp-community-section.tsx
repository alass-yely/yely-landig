"use client";

import { motion } from "framer-motion";
import { MessageCircle, Bell, ArrowUpRight, Users } from "lucide-react";

export function WhatsAppCommunitySection() {
  const WHATSAPP_LINK = "https://wa.me"; // Remplace par ton lien de groupe ou numéro

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#0f9b58] to-[#0b7a45] p-8 md:p-16 text-white shadow-2xl"
      >
        {/* Cercles décoratifs */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold backdrop-blur-md">
              <Bell size={16} className="animate-bounce" />
              Lancement prochainement
            </div>
            
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ne ratez pas le départ. <br />
              <span className="text-emerald-200">Rejoignez le club YELY.</span>
            </h2>
            
            <p className="mt-6 text-lg text-emerald-50/90 leading-relaxed">
              Accès limité aux 100 premiers chauffeurs pour le lancement pilote. Rejoignez notre communauté WhatsApp pour être les premiers informés, poser vos questions et participer au bêta-test.
            </p>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Users size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Communauté active</p>
                  <p className="text-emerald-100/70">Partage d&apos;astuces fuel</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <ArrowUpRight size={20} />
                </div>
                <div className="text-sm">
                  <p className="font-bold">Accès Prioritaire</p>
                  <p className="text-emerald-100/70">Bonus de bienvenue exclusifs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-3xl bg-white/10 p-8 backdrop-blur-lg border border-white/20">
            <MessageCircle size={60} className="mb-6 text-white" />
            <h3 className="mb-2 text-xl font-bold text-center">Intégrer le groupe WhatsApp</h3>
            <p className="mb-8 text-center text-sm text-emerald-100">
              Échangez avec l&apos;équipe fondatrice et d&apos;autres chauffeurs déjà inscrits.
            </p>
            
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#0f9b58] shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Rejoindre la communauté
              <ArrowUpRight size={20} />
            </a>
            
            <p className="mt-4 text-[10px] uppercase tracking-widest text-emerald-200 font-bold">
              Gratuit • Sans engagement • Info en temps réel
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
