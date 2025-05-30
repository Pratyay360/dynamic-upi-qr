"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useClientTheme = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a stable theme value to prevent hydration mismatches
  const currentTheme = mounted ? (resolvedTheme || theme) : 'light';
  const isDark = currentTheme === 'dark';

  return {
    theme: currentTheme,
    isDark,
    setTheme,
    mounted
  };
};
