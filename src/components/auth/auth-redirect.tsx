"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getDefaultRedirectPathByRole,
  getStoredUser,
  isAuthenticated,
} from "@/lib/utils/session";

type AuthRedirectProps = {
  children: React.ReactNode;
};

export function AuthRedirect({ children }: AuthRedirectProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setChecked(true);
      return;
    }

    const user = getStoredUser();
    const path = getDefaultRedirectPathByRole(user?.role);

    router.replace(path); // 👈 important: replace au lieu de push
  }, [router]);

  // 👇 empêche le flash UI
  if (!checked) return null;

  return <>{children}</>;
}