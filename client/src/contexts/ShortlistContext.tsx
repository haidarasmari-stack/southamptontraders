import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { builders } from "@/data/catalog";

const STORAGE_KEY = "southampton-traders:shortlist:v1";
const knownBuilderSlugs = new Set(builders.map((builder) => builder.slug));

export function normalizeShortlist(value: unknown) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((slug): slug is string => typeof slug === "string" && knownBuilderSlugs.has(slug)))];
}

export function toggleShortlistSlug(slugs: string[], slug: string) {
  if (!knownBuilderSlugs.has(slug)) return slugs;
  return slugs.includes(slug) ? slugs.filter((item) => item !== slug) : [...slugs, slug];
}

type ShortlistContextValue = {
  savedBuilderSlugs: string[];
  ready: boolean;
  toggleBuilder: (slug: string) => void;
  clearShortlist: () => void;
};

const ShortlistContext = createContext<ShortlistContextValue | undefined>(undefined);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [savedBuilderSlugs, setSavedBuilderSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const readStorage = useCallback(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setSavedBuilderSlugs(stored ? normalizeShortlist(JSON.parse(stored)) : []);
    } catch {
      setSavedBuilderSlugs([]);
    }
  }, []);

  useEffect(() => {
    readStorage();
    setReady(true);
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) readStorage();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [readStorage]);

  const toggleBuilder = useCallback((slug: string) => {
    if (!ready || !knownBuilderSlugs.has(slug)) return;
    setSavedBuilderSlugs((current) => {
      const next = toggleShortlistSlug(current, slug);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the current session usable if browser storage is unavailable.
      }
      return next;
    });
  }, [ready]);

  const clearShortlist = useCallback(() => {
    setSavedBuilderSlugs([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Clearing the in-memory list still works if browser storage is unavailable.
    }
  }, []);

  const value = useMemo(() => ({ savedBuilderSlugs, ready, toggleBuilder, clearShortlist }), [savedBuilderSlugs, ready, toggleBuilder, clearShortlist]);
  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) throw new Error("useShortlist must be used within ShortlistProvider");
  return context;
}
