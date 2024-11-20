/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("selectedTheme") || "theme_light";
  });

  const [font, setFont] = useState(() => {
    return localStorage.getItem("selectedFont") || "default_font";
  });

  useEffect(() => {
    localStorage.setItem("selectedTheme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("selectedFont", font);
    document.body.style.fontFamily = font === "default_font" ? "" : font;
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}
