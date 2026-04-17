"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthRedirect } from "@/components/auth/auth-redirect";
import { LoginForm } from "@/components/forms/login-form";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <AuthRedirect>
      <section className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Bouton retour optionnel */}
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#0f9b58] transition-colors">
            <ChevronLeft size={16} /> Retour à l&apos;accueil
          </Link>
          
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">
            Content de vous revoir
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Accédez à votre tableau de bord YELY
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white px-8 py-10 shadow-xl border border-slate-100 sm:rounded-4xl">
            <LoginForm />
            
            <div className="mt-8 border-t border-slate-100 pt-6">
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Pas encore membre ?{" "}
                  <Link href="/register" className="font-bold text-[#0f9b58] hover:text-[#0b7a45]">
                    Créer un compte gratuitement
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            En vous connectant, vous acceptez nos <Link href="/terms" className="underline">Conditions</Link> et notre <Link href="/privacy" className="underline">Politique de confidentialité</Link>.
          </p>
        </motion.div>
      </section>
    </AuthRedirect>
  );
}
