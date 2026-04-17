"use client";

import { motion } from "framer-motion";
import { OrganizationLeadForm } from "@/components/forms/organization-lead-form";
import { ChevronLeft, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function OrganisationPage() {
  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0f9b58] transition-colors">
          <ChevronLeft size={16} /> Retour à l&apos;accueil
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start">
          
          {/* Contenu Informatif */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0f9b58]">Espace Partenaires</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Digitalisez le suivi de votre <span className="text-[#0f9b58]">flotte.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-xl">
              Réduisez vos coûts opérationnels et sécurisez votre budget carburant grâce à notre solution de tracking certifiée.
            </p>

            {/* Grille de bénéfices B2B */}
            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#0f9b58] flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Contrôle Anti-fraude</h3>
                <p className="text-xs text-slate-500 mt-2">Chaque plein est certifié par la station, éliminant les doutes sur la consommation.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <BarChart3 size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Analytics Avancés</h3>
                <p className="text-xs text-slate-500 mt-2">Visualisez les performances de chaque véhicule via un dashboard dédié.</p>
              </div>
            </div>
          </div>

          {/* Le Formulaire de Lead */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/60"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">Demander une démo</h2>
              <p className="text-sm text-slate-500 mt-1">L&apos;équipe YELY vous contactera sous 24h.</p>
            </div>
            <OrganizationLeadForm />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
