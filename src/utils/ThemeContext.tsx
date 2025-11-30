import React, { createContext, useContext, ReactNode, useCallback } from "react";
import useAccount from "../state/userState";
import { darkColors, lightColors, ThemeColors } from "../constant/theme";




type ThemeType = {
  mode: "light" | "dark";
  isDark: boolean;
  toggleTheme: () => void;
  colors:ThemeColors
};

const ThemeContext = createContext<ThemeType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { theme, updateTheme } = useAccount(); // theme: "Light" | "Dark"

  const isDark = theme.toLowerCase() === "dark";
  const colors=isDark?darkColors:lightColors
  const toggleTheme = useCallback(() => {
    updateTheme(isDark ? "Light" : "Dark");
  }, [isDark, updateTheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode: isDark ? "dark" : "light",
        isDark,
        toggleTheme,
        colors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
