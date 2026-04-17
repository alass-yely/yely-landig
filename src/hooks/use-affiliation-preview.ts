"use client";

import { useEffect, useState } from "react";

import { getAffiliationPreview } from "@/lib/api/public";
import type { AffiliationPreviewOrganization } from "@/types/auth";

type AffiliationPreviewState = {
  loading: boolean;
  valid: boolean | null;
  organization: AffiliationPreviewOrganization | null;
};

export function useAffiliationPreview(code: string) {
  const [state, setState] = useState<AffiliationPreviewState>({
    loading: false,
    valid: null,
    organization: null,
  });

  useEffect(() => {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setState({ loading: false, valid: null, organization: null });
      return;
    }

    let isActive = true;
    const controller = new AbortController();

    setState((prev) => ({ ...prev, loading: true }));

    const timeout = setTimeout(async () => {
      try {
        const response = await getAffiliationPreview(trimmedCode, { signal: controller.signal });
        const organization = "organization" in response.data ? response.data.organization : response.data;

        if (!isActive) return;

        setState({
          loading: false,
          valid: true,
          organization,
        });
      } catch (error) {
        if (!isActive || controller.signal.aborted) return;

        setState({
          loading: false,
          valid: false,
          organization: null,
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
