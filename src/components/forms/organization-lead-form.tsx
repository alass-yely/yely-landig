"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import { Building2, User, Car, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createOrganizationLead } from "@/lib/api/organizations";
import { track } from "@/lib/tracking/events";

function normalizePhone(phone: string) {
  return phone.replace(/\s/g, "");
}

export function OrganizationLeadForm() {
  const [form, setForm] = useState({
    organizationName: "",
    contactName: "",
    phone: "",
    email: "",
    fleetSize: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.organizationName.trim().length > 0 &&
      form.contactName.trim().length > 0 &&
      form.phone.trim().length > 0
    );
  }, [form]);


  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem("yely_user");
      if (!storedUser) return;
      const parsed = JSON.parse(storedUser) as { firstName?: string; lastName?: string; phone?: string };

      setForm((previous) => ({
        ...previous,
        contactName:
          previous.contactName ||
          [parsed.firstName, parsed.lastName].filter(Boolean).join(" ").trim(),
        phone: previous.phone || parsed.phone || "",
      }));
    } catch {
      // Ignore invalid user data in storage
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSuccess(false);

    let rawPhone = form.phone.replace(/\s/g, "");
    if (!rawPhone.startsWith("+225") && rawPhone.length === 10) {
      rawPhone = `+225${rawPhone}`;
    }


    
    if (!form.organizationName.trim()) {
      setErrorMessage("Le nom de l'organisation est requis.");
      return;
    }

    if (!form.contactName.trim()) {
      setErrorMessage("Le nom du contact est requis.");
      return;
    }

    if (!form.phone.trim()) {
      setErrorMessage("Le telephone est requis.");
      return;
    }

    if (form.email && !form.email.includes("@")) {
      setErrorMessage("Email invalide.");
      return;
    }

    const fleetSizeNumber = Number(form.fleetSize);

    if (fleetSizeNumber < 0) {
      setErrorMessage("Taille de flotte invalide.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrganizationLead({ ...form, phone: rawPhone, fleetSize: Number(form.fleetSize) });
      track("organisation_lead_submit", {
        organizationName: form.organizationName,
        phone: form.phone,
        fleetSize: form.fleetSize,
      });
      setIsSuccess(true);
      setForm({ organizationName: "", contactName: "", phone: "", email: "", fleetSize: "" });
    } catch (error: unknown) {
      setErrorMessage((error as Error).message || "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-[#0f9b58]">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Demande envoyée !</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Merci pour votre intérêt. Un conseiller YELY vous contactera sur votre numéro <span className="font-bold text-slate-700">{form.phone}</span> sous 24h.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Organisation Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Organisation</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f9b58]">
            <Building2 size={18} />
          </div>
          <input
            type="text"
            required
            value={form.organizationName}
            onChange={(e) => setForm({...form, organizationName: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#0f9b58]/10 focus:border-[#0f9b58] transition-all"
            placeholder="Nom de l'entreprise"
          />
        </div>
      </div>

      {/* Contact Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Responsable</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f9b58]">
            <User size={18} />
          </div>
          <input
            type="text"
            required
            value={form.contactName}
            onChange={(e) => setForm({...form, contactName: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#0f9b58]/10 focus:border-[#0f9b58] transition-all"
            placeholder="Nom complet"
          />
        </div>
      </div>

      {/* Phone avec +225 visuel */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Téléphone Direct</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none border-r border-slate-200 pr-3 my-2 text-sm font-bold text-slate-400">
             <span className="mr-1">🇨🇮</span> +225
          </div>
          <input
            type="tel"
            required
            maxLength={10}
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value.replace(/\D/g, "")})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-28 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#0f9b58]/10 focus:border-[#0f9b58] transition-all"
            placeholder="0700000000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0f9b58]/10 focus:border-[#0f9b58] transition-all"
            placeholder="pro@yely.app"
          />
        </div>
        {/* Fleet Size */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Nb. Véhicules</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f9b58]">
              <Car size={16} />
            </div>
            <input
              type="number"
              value={form.fleetSize}
              onChange={(e) => setForm({...form, fleetSize: e.target.value})}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#0f9b58]/10 focus:border-[#0f9b58] transition-all"
              placeholder="Ex: 15"
            />
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-100">
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="w-full flex items-center justify-center rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Envoyer ma demande de démo"}
      </button>
    </form>
  );
}