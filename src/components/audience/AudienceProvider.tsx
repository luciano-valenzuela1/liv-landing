"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ROUTES, type Audience } from "@/content/landing";
import { track } from "@/lib/analytics";

interface AudienceState {
  audience: Audience;
  audienceTouched: boolean;
  /** Registration href for every "Crear mi cuenta" CTA. */
  registerHref: string;
  selectAudience: (audience: Audience, selector: "hero" | "beneficios") => void;
}

const AudienceContext = createContext<AudienceState | null>(null);

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("empresa");
  const [audienceTouched, setAudienceTouched] = useState(false);

  const selectAudience = useCallback(
    (next: Audience, selector: "hero" | "beneficios") => {
      setAudience(next);
      setAudienceTouched(true);
      track({
        name: "audience_select",
        props: { audience: next, selector },
      });
    },
    [],
  );

  const value = useMemo<AudienceState>(
    () => ({
      audience,
      audienceTouched,
      registerHref: audienceTouched
        ? `${ROUTES.register}?perfil=${audience}`
        : ROUTES.register,
      selectAudience,
    }),
    [audience, audienceTouched, selectAudience],
  );

  return (
    <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
  );
}

export function useAudience(): AudienceState {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
