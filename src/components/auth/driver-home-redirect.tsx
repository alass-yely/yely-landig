"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStoredUser, isAuthenticated } from "@/lib/utils/session";

type DriverHomeRedirectProps = {
  children: React.ReactNode;
};

export function DriverHomeRedirect({ children }: DriverHomeRedirectProps) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      setChecked(true);
      return;
    }

    const user = getStoredUser();
    if (user?.role === "DRIVER") {
      router.replace("/chauffeur");
      return;
    }

    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return <>{children}</>;
}
