"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { motion } from "framer-motion";
import { 
  QrCode, Wallet, Fuel, Users2, Building2, Receipt, MessageCircle,
} from "lucide-react";
import { useAffiliationPreview } from "@/hooks/use-affiliation-preview";
import { ShareActions } from "@/components/success/share-actions";
import { env } from "@/lib/config/env";
import { getDriverAffiliation, getDriverDashboard, getDriverReferralsSummary } from "@/lib/api/drivers";
import { applyAffiliation } from "@/lib/api/network";
import type {
  DriverAffiliationData,
  DriverDashboardData,
  DriverReferralSummaryData,
} from "@/types/driver";
import type { AuthUser } from "@/types/auth";
import { track } from "@/lib/tracking/events";

type LoadState = "idle" | "loading" | "success" | "error" | "no-session";

type DriverDashboardProps = {
  affiliationCode?: string;
  initialReferralCode?: string;
};

type ActionState = "idle" | "loading" | "success" | "error";

export function DriverDashboard({ affiliationCode = "", initialReferralCode = "" }: DriverDashboardProps) {
  const [state, setState] = useState<LoadState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<DriverDashboardData | null>(null);
  const [storedUser, setStoredUser] = useState<AuthUser | null>(null);

  const [affiliation, setAffiliation] = useState<DriverAffiliationData | null>(null);
  const [affiliationError, setAffiliationError] = useState<string | null>(null);
  const [affiliationState, setAffiliationState] = useState<ActionState>("idle");
  const [hasAutoApplied, setHasAutoApplied] = useState(false);
  const [affiliationCodeInput, setAffiliationCodeInput] = useState(affiliationCode);

  const [referralsSummary, setReferralsSummary] = useState<DriverReferralSummaryData | null>(null);
  const [referralsError, setReferralsError] = useState<string | null>(null);

  const preview = useAffiliationPreview(affiliationCodeInput);

  useEffect(() => {
    const token = window.localStorage.getItem("yely_access_token");

    if (!token) {
      setState("no-session");
      return;
    }

    let isActive = true;

    async function loadDashboard() {
      setState("loading");
      setError(null);
      setAffiliationError(null);
      setReferralsError(null);

      try {
        try {
          const rawUser = window.localStorage.getItem("yely_user");
          setStoredUser(rawUser ? (JSON.parse(rawUser) as AuthUser) : null);
        } catch {
          setStoredUser(null);
        }

        const [dashboardResponse, affiliationResponse, referralsResponse] = await Promise.all([
          getDriverDashboard(token),
          getDriverAffiliation(token).catch((err: any) => {
            setAffiliationError(err?.message ?? "Affiliation indisponible.");
            return { success: false, data: null };
          }),
          getDriverReferralsSummary(token).catch((err: any) => {
            setReferralsError(err?.message ?? "Filleuls indisponibles.");
            return { success: false, data: { invitationCount: 0, referredDrivers: [] } };
          }),
        ]);

        if (!isActive) return;

        setDashboard(dashboardResponse.data);
        setAffiliation(affiliationResponse.data ?? null);
        setReferralsSummary(referralsResponse.data);
        setState("success");
      } catch (err: any) {
        if (!isActive) return;
        setError(err?.message ?? "Impossible de charger le tableau de bord.");
        setState("error");
      }
    }

    loadDashboard();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!affiliationCode || hasAutoApplied) return;
    if (affiliation?.organization) return;

    const token = window.localStorage.getItem("yely_access_token");
    if (!token) return;

    setHasAutoApplied(true);
    setAffiliationState("loading");

    applyAffiliation(token, affiliationCode)
      .then(() => {
        setAffiliationState("success");
        return getDriverAffiliation(token);
      })
      .then((response) => {
        setAffiliation(response.data ?? null);
      })
      .catch((err: any) => {
        setAffiliationState("error");
        setAffiliationError(err?.message ?? "Affiliation impossible.");
      });
  }, [affiliationCode, affiliation, hasAutoApplied]);

  if (state === "no-session") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        <p>Vous devez etre connecte pour acceder a votre espace chauffeur.</p>
        <Link
          href="/login"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-[#0f9b58] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0b7a45]"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (state === "loading" || state === "idle") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Chargement de votre espace chauffeur...
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error ?? "Erreur lors du chargement."}
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const transactions = (dashboard.recentTransactions ?? []).slice(0, 10);
  const referralCode = storedUser?.referralCode || initialReferralCode;
  const whatsappCommunityUrl = env.whatsappCommunityUrl || "#";


  const hasAffiliation = Boolean(affiliation?.organization?.name);
  const referralCount = referralsSummary?.invitationCount ?? 0;

  async function handleApplyAffiliation() {
    const token = window.localStorage.getItem("yely_access_token");
    if (!token) {
      setAffiliationError("Connectez-vous pour rejoindre une organisation.");
      return;
    }

    if (!affiliationCodeInput.trim()) {
      setAffiliationError("Le code d'affiliation est requis.");
      return;
    }

    track("affiliation_apply_click", { code: affiliationCodeInput.trim() });

    setAffiliationError(null);
    setAffiliationState("loading");

    try {
      await applyAffiliation(token, affiliationCodeInput.trim());
      track("affiliation_apply_success", { affiliationCode: affiliationCodeInput.trim() });
      setAffiliationState("success");
      const refreshed = await getDriverAffiliation(token);
      setAffiliation(refreshed.data ?? null);
    } catch (err: any) {
      track("affiliation_apply_error", { code: affiliationCodeInput.trim(), message: err?.message ?? "Affiliation impossible." });
      setAffiliationState("error");
      setAffiliationError(err?.message ?? "Affiliation impossible.");
    }
  }

    return (
  <div className="space-y-6 pb-12">
    
    {/* 1. Résumé Cashback & Litres (Le coeur du dashboard) */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#0f9b58] to-[#0b7a45] p-6 text-white shadow-xl"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 opacity-80 text-[10px] font-black uppercase tracking-widest">
            <Wallet size={14} /> Solde cumulé
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-4xl font-black">{formatAmount(dashboard.cashback?.totalCashbackAmount ?? 0)}</h3>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {dashboard.cashback?.entryCount ?? 0} Pleins enregistrés
          </div>
        </div>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      </motion.div>

      <div className="rounded-4xl bg-white border border-slate-100 p-6 shadow-sm flex flex-col justify-center">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
          <Fuel size={14} /> Volume Total
        </div>
        <h3 className="text-3xl font-black text-slate-900">{formatLiters(dashboard.cashback?.totalLiters ?? 0)}</h3>
        <p className="text-xs text-slate-500 mt-1">Consommation tracée sur YELY</p>
      </div>
    </div>

    {/* 2. QR Code & Parrainage (Actions prioritaires) */}
    <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
      
      <div className="space-y-6">
        {/* Historique des Transactions */}
        <div className="rounded-4xl bg-white border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Activité récente</h4>
            <Receipt size={18} className="text-slate-300" />
          </div>

          {transactions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 border-2 border-dashed border-slate-50 rounded-2xl">
              <p className="text-sm italic font-medium">Aucune transaction enregistrée.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#0f9b58] font-bold text-xs">
                      {tx.liters}L
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tx.station?.name ?? "Station"}</p>
                      <p className="text-[10px] text-slate-400">{tx.confirmedAt ? new Date(tx.confirmedAt).toLocaleDateString() : "En cours"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-[#0f9b58]">+{formatAmount(tx.cashbackAmount)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Parrainage / Filleuls */}
        <div className="rounded-4xl bg-emerald-50/50 border border-emerald-100 p-6">
          <div className="flex items-center justify-between mb-4">
             <h4 className="text-sm font-black uppercase tracking-widest text-emerald-900">Mon Réseau</h4>
             <Users2 size={18} className="text-[#0f9b58]" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Filleuls</p>
                <p className="text-2xl font-black text-slate-900">{referralCount}</p>
             </div>
             <div className="bg-[#0f9b58] p-4 rounded-2xl shadow-md text-white">
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Code Promo</p>
                <p className="text-lg font-black">{referralCode || "---"}</p>
             </div>
          </div>
          <ShareActions referralCode={referralCode} />
        </div>
      </div>

      {/* Sidebar Mobile/Desktop */}
      <div className="space-y-6">
        {/* QR Code Card */}
        <div className="rounded-[2.5rem] bg-slate-900 p-8 text-center text-white shadow-xl shadow-slate-200">
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-6">Identifiant QR</p>
           <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-white p-4">
             {/* Simuler le QR ou insérer le composant QR réel */}
             <QrCode size={140} className="text-slate-900" />
           </div>
           <div className="mt-6 px-4 py-2 bg-white/10 rounded-full text-[11px] font-mono tracking-widest truncate">
             {dashboard.qr?.token ?? "PAS DE TOKEN"}
           </div>
           <p className="mt-6 text-[11px] text-slate-400 leading-relaxed">
             À présenter au pompiste pour <br/> accumuler vos litres.
           </p>
        </div>

        {/* Affiliation Section */}
        <div className="rounded-4xl bg-white border border-slate-100 p-6 shadow-sm">
           <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest mb-4">
             <Building2 size={16} className="text-blue-500" /> Affiliation
           </div>
           
           {hasAffiliation ? (
             <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
               <p className="text-xs font-bold text-blue-700">{affiliation?.organization?.name}</p>
               <p className="text-[10px] text-blue-500 mt-1 uppercase">Rattaché • {affiliation?.status}</p>
             </div>
           ) : (
             <div className="space-y-3">
                <input
                  type="text"
                  value={affiliationCodeInput}
                  onChange={(e) => setAffiliationCodeInput(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Code Organisation (ex: ORG-123)"
                />
                {preview.valid && (
                  <p className="text-[10px] font-bold text-emerald-600 italic">✓ {preview.organization?.name}</p>
                )}
                <button
                  onClick={handleApplyAffiliation}
                  disabled={affiliationState === "loading"}
                  className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {affiliationState === "loading" ? "Chargement..." : "Rejoindre la flotte"}
                </button>
             </div>
           )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappCommunityUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("whatsapp_community_click")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
        >
          <MessageCircle size={18} />
          Communauté WhatsApp
        </a>
      </div>
    </div>
  </div>
);}

function formatAmount(value: number | string) {
  return `${new Intl.NumberFormat("fr-FR").format(Number(value))} FCFA`;
}

function formatLiters(value: number | string) {
  return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(Number(value))} L`;
}
