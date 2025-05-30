import { useEffect, useState } from 'react';

export const useThemeDetector = (): string => {
  const getCurrentTheme = () => {
    // Check if window is available to handle server-side rendering in Next.js
    if (typeof window === 'undefined') return 'light'; // Default to light theme on server
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<string>(() => getCurrentTheme());

  useEffect(() => {
    // Skip effect if running on server
    if (typeof window === 'undefined') return;

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Use addEventListener for modern browsers, compatible with Next.js 15
    darkThemeMq.addEventListener('change', listener);
    return () => darkThemeMq.removeEventListener('change', listener);
  }, []);

  return theme;
};