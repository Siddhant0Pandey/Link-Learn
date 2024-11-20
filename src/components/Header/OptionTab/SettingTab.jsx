import { useState } from "react";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import DropdownOptions from "./DropdownOptions";
import "../../../styles/settings.css";

function SettingTab() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="setting_tab">
      <span className="setting_icon" onClick={toggleDropdown}>
        {isDropdownVisible ? (
          <IoSettingsSharp className="icons icon_set_sharp" />
        ) : (
          <IoSettingsOutline className="icons icon_set" />
        )}
      </span>
      {isDropdownVisible && <DropdownOptions />}
    </div>
  );
}

export default SettingTab;
