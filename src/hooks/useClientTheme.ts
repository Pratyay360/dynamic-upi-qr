import { useState, useEffect } from "react";

export type ClientTheme = {
  isDark: boolean;
  mounted: boolean;
};

export function useClientTheme(): ClientTheme {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => setIsDark(mediaQuery.matches);
    updateTheme();
    mediaQuery.addEventListener?.("change", updateTheme);
    return () => mediaQuery.removeEventListener?.("change", updateTheme);
  }, []);

  return { isDark, mounted };
}
