/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("theme_light");
  const [font, setFont] = useState("default_font");
  const [achievements, setAchievements] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [achievementMessage, setAchievementMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/eduactivity/link");
        const data = await response.json();

        setAchievements(data.achievements || []);
        setTheme(data.theme || "theme_light");
        setFont(data.font || "default_font");
        setTimeSpent(data.timeSpent || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    document.body.style.fontFamily = font === "default_font" ? "" : font;
  }, [font]);

  useEffect(() => {
    if (timeSpent >= 20 && !achievements.includes("Dark Mode Unlocked")) {
      unlockAchievement("Dark Mode Unlocked");
    }
    if (timeSpent >= 300 && !achievements.includes("Pastel Mode Unlocked")) {
      unlockAchievement("Pastel Mode Unlocked");
    }
  }, [timeSpent, achievements]);

  const unlockAchievement = async (achievement) => {
    if (!achievements.includes(achievement)) {
      const updatedAchievements = [...achievements, achievement];
      setAchievements(updatedAchievements);
      showAchievementMessage(achievement);

      try {
        const response = await fetch("http://localhost:3000/eduactivity/link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ achievements: updatedAchievements }),
        });

        if (!response.ok) {
          throw new Error("Failed to save achievement");
        }
      } catch (error) {
        console.error("Eror updating achievements:", error);
      }
    }
  };

  const showAchievementMessage = (achievement) => {
    setAchievementMessage(`🎉 Achievement Unlocked: ${achievement}!`);
    setTimeout(() => {
      setAchievementMessage("");
    }, 10000);
  };

  const updateTimeSpent = (sessionTime) => {
    setTimeSpent((prevTime) => prevTime + sessionTime);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        font,
        setFont,
        achievements,
        achievementMessage,
        updateTimeSpent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
