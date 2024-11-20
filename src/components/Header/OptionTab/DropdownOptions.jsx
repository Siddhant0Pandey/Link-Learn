import { useContext, useState } from "react";
import "../../../styles/settings.css";
import { ThemeContext } from "../../../context/ThemeContext";

function DropdownOptions() {
  const [isThemeDropdownVisible, setIsThemeDropdownVisible] = useState(false);
  const [isFontDropdownVisible, setIsFontDropdownVisible] = useState(false);
  const { setTheme, setFont } = useContext(ThemeContext);
  const toggleThemeDropdown = () => {
    setIsThemeDropdownVisible(!isThemeDropdownVisible);
    setIsFontDropdownVisible(false);
  };

  const toggleFontDropdown = () => {
    setIsFontDropdownVisible(!isFontDropdownVisible);
    setIsThemeDropdownVisible(false);
  };

  return (
    <div className="setting_dropdown">
      <ul className="dropdown_options">
        <li className="theme_dropdown" onClick={toggleThemeDropdown}>
          Change Theme
          {isThemeDropdownVisible && (
            <ul className="theme_dropdown_options">
              <li onClick={() => setTheme("theme_dark")}>
                <div className="color_option color_option_1"></div>
                <h5>Dark</h5>
              </li>
              <li onClick={() => setTheme("theme_light")}>
                <div className="color_option color_option_2"></div>
                <h5>Light</h5>
              </li>
              <li onClick={() => setTheme("theme_pastel")}>
                <div className="color_option color_option_3"></div>
                <h5>Pastel</h5>
              </li>
            </ul>
          )}
        </li>
        <li className="font_dropdown" onClick={toggleFontDropdown}>
          Change Fonts
          {isFontDropdownVisible && (
            <ul className="font_dropdown_options">
              <li onClick={() => setFont("default_font")}>
                <span
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                  className="font_option_style"
                >
                  A
                </span>{" "}
                Default Font
              </li>
              <li onClick={() => setFont("font_arial")}>
                <span
                  style={{ fontFamily: "arial" }}
                  className="font_option_style"
                >
                  A
                </span>{" "}
                Arial
              </li>
              <li onClick={() => setFont("font_mono")}>
                <span
                  style={{ fontFamily: "monospace" }}
                  className="font_option_style"
                >
                  A
                </span>{" "}
                Monospace
              </li>
              <li onClick={() => setFont("font_timesnew")}>
                <span
                  style={{ fontFamily: "Times New Roman" }}
                  className="font_option_style"
                >
                  A
                </span>{" "}
                Times New Roman
              </li>
              <li onClick={() => setFont("font_courier")}>
                <span
                  style={{ fontFamily: "Courier New" }}
                  className="font_option_style"
                >
                  A
                </span>{" "}
                Courier New
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default DropdownOptions;
