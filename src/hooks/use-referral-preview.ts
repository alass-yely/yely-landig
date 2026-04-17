"use client";

import { useEffect, useState } from "react";

import { getReferralPreview } from "@/lib/api/public";
import type { ReferralPreviewDriver } from "@/types/auth";

type ReferralPreviewState = {
  loading: boolean;
  valid: boolean | null;
  driver: ReferralPreviewDriver | null;
};

export function useReferralPreview(code: string) {
  const [state, setState] = useState<ReferralPreviewState>({
    loading: false,
    valid: null,
    driver: null,
  });

  useEffect(() => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setState({ loading: false, valid: null, driver: null });
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    setState((prev) => ({ ...prev, loading: true }));

    const timeout = setTimeout(async () => {
      try {
        const response = await getReferralPreview(trimmedCode, { signal: controller.signal });
        const driver = "driver" in response.data ? response.data.driver : response.data;

        if (!isActive) return;

        setState({
          loading: false,
          valid: true,
          driver,
        });
      } catch (error) {
        if (!isActive || controller.signal.aborted) return;

        setState({
          loading: false,
          valid: false,
          driver: null,
        });
      }
    }, 300);

    return () => {
      isActive = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [code]);

  return state;
}
