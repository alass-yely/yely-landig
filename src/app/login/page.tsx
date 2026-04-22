"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { AuthRedirect } from "@/components/auth/auth-redirect";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthRedirect>
      <section className="flex min-h-screen flex-col justify-center bg-slate-50 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#0f9b58]"
          >
            <ChevronLeft size={16} /> Retour a l'accueil
          </Link>

          <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Connexion YELY</h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Connectez-vous avec votre numero de telephone et votre PIN pour acceder a votre espace.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="border border-slate-100 bg-white px-8 py-10 shadow-xl sm:rounded-4xl">
            <LoginForm />

            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Nouveau sur YELY ?
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/register" className="font-bold text-[#0f9b58] hover:text-[#0b7a45]">
                  Creer un compte chauffeur
                </Link>
                <Link href="/organisation" className="font-bold text-[#0f9b58] hover:text-[#0b7a45]">
                  Inscrire une organisation
                </Link>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Choisissez le parcours qui correspond a votre profil.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </AuthRedirect>
  );
}
