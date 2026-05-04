"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Site } from "@/lib/site";

const SiteContext = createContext<Site | null>(null);

export function SiteProvider({
  site,
  children,
}: {
  site: Site;
  children: ReactNode;
}) {
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): Site {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within <SiteProvider>");
  return ctx;
}
