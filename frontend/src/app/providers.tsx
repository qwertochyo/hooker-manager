import { type ReactNode, useEffect } from 'react';

import { LOCALSTORAGE } from '../utils/constants';
import { useThemeStore } from '../utils/stores';

interface ProvidersProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (!localStorage.getItem(LOCALSTORAGE.THEME)) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
};

export const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider>{children}</ThemeProvider>
);
