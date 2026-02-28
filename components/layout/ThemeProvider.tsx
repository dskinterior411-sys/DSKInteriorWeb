"use client";

import { useEffect } from "react";
import { getSettings } from "@/lib/api";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function loadThemeColors() {
      try {
        const settings = await getSettings();
        const root = document.documentElement;
        
        // Set CSS variables for theme colors
        if (settings.theme_primary) {
          root.style.setProperty('--color-primary', settings.theme_primary);
        }
        if (settings.theme_accent) {
          root.style.setProperty('--color-accent', settings.theme_accent);
        }
        if (settings.theme_dark) {
          root.style.setProperty('--color-dark', settings.theme_dark);
        }
      } catch (error) {
        console.error('Error loading theme colors:', error);
        // Fallback to default colors
        const root = document.documentElement;
        root.style.setProperty('--color-primary', '#b28e5d');
        root.style.setProperty('--color-accent', '#FDCDCA');
        root.style.setProperty('--color-dark', '#0D0000');
      }
    }
    
    loadThemeColors();
  }, []);

  return <>{children}</>;
}


