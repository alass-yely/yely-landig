"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, LayoutDashboard, Home } from "lucide-react";

import { getDefaultRedirectPathByRole } from "@/lib/utils/session";
import type { AuthUser } from "@/types/auth";

type UserMenuProps = {
  user: AuthUser | null;
  onLogout: () => void;
};

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const initials = user?.firstName?.[0]?.toUpperCase() ?? "Y";
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  
  const roleLabels: Record<string, string> = {
    CHAUFFEUR: "Chauffeur Partenaire",
    ORGANISATION: "Gestionnaire Organisation",
    ADMIN: "Administrateur",
  };
  const roleLabel = user?.role ? (roleLabels[user.role] || user.role) : "";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tes fonctions de logique originales
  function handleNavigate() {
    setOpen(false);
  }

  function handleLogout() {
    setOpen(false);
    onLogout(); // Appelle la fonction passée en props (clearSession, router.push, etc.)
  }

  const spacePath = getDefaultRedirectPathByRole(user?.role);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 rounded-full border p-1 pr-4 transition-all duration-200 ${
          open 
          ? "border-[#0f9b58] bg-[#0f9b58]/5 ring-4 ring-[#0f9b58]/10" 
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        }`}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f9b58] text-[13px] font-bold text-white shadow-sm">
          {initials}
        </div>
        <span className="hidden text-sm font-semibold text-slate-700 sm:block">
          {user?.firstName ?? "Compte"}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl transition-all duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="bg-slate-50/50 px-5 py-4">
          <p className="truncate text-sm font-bold text-slate-900">{fullName || "Utilisateur"}</p>
          {roleLabel && (
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {roleLabel}
            </p>
          )}
        </div>

        <div className="p-2 flex flex-col gap-1">
          <Link
            href={spacePath}
            onClick={handleNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-[#0f9b58]"
          >
            <LayoutDashboard size={16} className="text-slate-400" />
            Mon espace
          </Link>
          
          <Link
            href="/"
            onClick={handleNavigate}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50 hover:text-[#0f9b58]"
          >
            <Home size={16} className="text-slate-400" />
            Accueil
          </Link>

          <div className="my-2 h-px bg-slate-100" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
