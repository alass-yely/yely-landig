"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // Pense à installer lucide-react

import { UserMenu } from "@/components/layout/user-menu";
import { clearSession, getSessionSnapshot, SESSION_CHANGED_EVENT } from "@/lib/utils/session";
import type { AuthUser } from "@/types/auth";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function syncSessionState() {
      const snapshot = getSessionSnapshot();
      setUser(snapshot.user);
      setHasAccessToken(Boolean(snapshot.accessToken));
    }

    syncSessionState();
    setReady(true);

    window.addEventListener(SESSION_CHANGED_EVENT, syncSessionState);
    window.addEventListener("storage", syncSessionState);
    return () => {
      window.removeEventListener(SESSION_CHANGED_EVENT, syncSessionState);
      window.removeEventListener("storage", syncSessionState);
    };
  }, []);

  function handleLogout() {
    clearSession();
    setUser(null);
    setHasAccessToken(false);
    router.push("/");
    setIsOpen(false);
  }

  const authed = ready && hasAccessToken && Boolean(user);
  const role = user?.role;
  const isOrganizationRole = role === "ORG_OWNER" || role === "ORG_MANAGER";
  const isDriverRole = role === "DRIVER";

  const publicNavLinks = [
    { href: "/", label: "Accueil" },
    { href: "/organisations", label: "organisation" },
  ];
  const authenticatedNavLinks = isOrganizationRole
    ? [{ href: "/organisation-dashboard", label: "Dashboard organisation" }]
    : isDriverRole
      ? [{ href: "/chauffeur", label: "Mon espace chauffeur" }]
      : [{ href: "/", label: "Accueil" }];
  const navLinks = authed ? authenticatedNavLinks : publicNavLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-90">
          <Image src="/yely-logo-light.png" alt="YELY" width={110} height={28} priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-[#0f9b58]"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-4 w-px bg-slate-200" />

          {authed ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                Connexion
              </Link>
              <Link
                href="/organisation"
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 active:scale-95"
              >
                Inscrire une organisation
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#0f9b58] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0b7a45] hover:shadow-md active:scale-95"
              >
                S&apos;inscrire chauffeur
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          {authed && <UserMenu user={user} onLogout={handleLogout} />}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-slate-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-100 bg-white p-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-slate-600"
              >
                {link.label}
              </Link>
            ))}
            {!authed && (
              <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-700">
                  Connexion
                </Link>
                <Link
                  href="/organisation"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg border border-slate-200 py-3 text-center font-semibold text-slate-700"
                >
                  Inscrire une organisation
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg bg-[#0f9b58] py-3 text-center font-semibold text-white"
                >
                  S&apos;inscrire chauffeur
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
