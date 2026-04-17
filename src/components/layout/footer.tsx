"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Info de la marque */}
          <div className="col-span-1 lg:col-span-1">
            <Image src="/yely-logo-light.png" alt="YELY" width={120} height={32} />
            <p className="mt-6 text-sm leading-relaxed text-slate-500">
              La première plateforme de tracking carburant avec cashback intelligent pour chauffeurs et organisations en Côte d&apos;Ivoire.
            </p>
            <div className="mt-6 flex gap-4">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Solutions</h3>
            <ul className="mt-6 space-y-4">
              <FooterLink href="/chauffeur">Pour les Chauffeurs</FooterLink>
              <FooterLink href="/organisation">Pour les Organisations</FooterLink>
              <FooterLink href="/partner">Devenir Partenaire</FooterLink>
            </ul>
          </div>

          {/* Support & Légal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Support</h3>
            <ul className="mt-6 space-y-4">
              <FooterLink href="/faq">Centre d&apos;aide</FooterLink>
              <FooterLink href="/terms">Conditions d&apos;utilisation</FooterLink>
              <FooterLink href="/privacy">Confidentialité</FooterLink>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Restez informé</h3>
            <p className="mt-6 text-sm text-slate-500">Recevez les dernières mises à jour et offres de cashback.</p>
            <form className="mt-4 flex gap-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm focus:border-[#0f9b58] focus:outline-none"
              />
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f9b58] text-white transition-transform hover:scale-110">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-9 border-t border-slate-200 pt-5 text-center">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} YELY. Tous droits réservés. Design conçu pour la mobilité.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-slate-500 transition-colors hover:text-[#0f9b58]">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 transition-all hover:border-[#0f9b58] hover:text-[#0f9b58] hover:shadow-sm">
      {icon}
    </Link>
  );
}
