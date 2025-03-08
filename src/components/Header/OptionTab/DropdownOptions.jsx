import { useContext, useState } from "react";
import "../../../styles/settings.css";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaLock } from "react-icons/fa";

function DropdownOptions() {
  const [isThemeDropdownVisible, setIsThemeDropdownVisible] = useState(false);
  const [isFontDropdownVisible, setIsFontDropdownVisible] = useState(false);
  const { setTheme, setFont, achievements, achievementMessage } =
    useContext(ThemeContext);

  const toggleThemeDropdown = () => {
    setIsThemeDropdownVisible(!isThemeDropdownVisible);
    setIsFontDropdownVisible(false);
  };

  const toggleFontDropdown = () => {
    setIsFontDropdownVisible(!isFontDropdownVisible);
    setIsThemeDropdownVisible(false);
  };

  const isDarkThemeUnlocked = achievements.includes("Dark Mode Unlocked");
  const isPastelThemeUnlocked = achievements.includes("Pastel Mode Unlocked");

  return (
    <div className="setting_dropdown">
      {/* Achievement Message */}
      {achievementMessage && (
        <div className="achievement_message">{achievementMessage}</div>
      )}

      <ul className="dropdown_options">
        <li className="theme_dropdown" onClick={toggleThemeDropdown}>
          Change Theme
          {isThemeDropdownVisible && (
            <ul className="theme_dropdown_options">
              <li
                onClick={() => isDarkThemeUnlocked && setTheme("theme_dark")}
                style={{
                  cursor: isDarkThemeUnlocked ? "pointer" : "not-allowed",
                  opacity: isDarkThemeUnlocked ? 1 : 0.5,
                }}
              >
                <div className="color_option color_option_1"></div>
                <h5>Dark {isDarkThemeUnlocked ? "" : <FaLock />}</h5>
              </li>

              <li onClick={() => setTheme("theme_light")}>
                <div className="color_option color_option_2"></div>
                <h5>Light</h5>
              </li>

              <li
                onClick={() =>
                  isPastelThemeUnlocked && setTheme("theme_pastel")
                }
                style={{
                  cursor: isPastelThemeUnlocked ? "pointer" : "not-allowed",
                  opacity: isPastelThemeUnlocked ? 1 : 0.5,
                }}
              >
                <div className="color_option color_option_3"></div>
                <h5>Pastel {isPastelThemeUnlocked ? "" : <FaLock />}</h5>
              </li>
            </ul>
          )}
        </li>

        <li className="font_dropdown" onClick={toggleFontDropdown}>
          Change Fonts
          {isFontDropdownVisible && (
            <ul className="font_dropdown_options">
              <li onClick={() => setFont("default_font")}>Default Font</li>
              <li onClick={() => setFont("font_arial")}>Arial</li>
              <li onClick={() => setFont("font_mono")}>Monospace</li>
              <li onClick={() => setFont("font_timesnew")}>Times New Roman</li>
              <li onClick={() => setFont("font_courier")}>Courier New</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default DropdownOptions;
