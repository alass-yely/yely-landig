"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getAccessToken,
  getDefaultRedirectPathByRole,
  getStoredUser,
} from "@/lib/utils/session";

type AuthRedirectProps = {
  children: React.ReactNode;
};

export function AuthRedirect({ children }: AuthRedirectProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    const user = getStoredUser();

    if (!accessToken || !user) {
      setChecked(true);
      return;
    }

    const path = getDefaultRedirectPathByRole(user.role);

    router.replace(path); // 👈 important: replace au lieu de push
  }, [router]);

  // 👇 empêche le flash UI
  if (!checked) return null;

  return <>{children}</>;
}
