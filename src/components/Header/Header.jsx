/* eslint-disable react/prop-types */
import Profile from "./UserProfile/profile";
import "../../styles/header.css";
import SettingTab from "./OptionTab/SettingTab";
import Note from "../Notes/Note";

function Header({ openNote, setOpenNote }) {
  return (
    <>
      <nav>
        <div className=" header_section">
          <h4 className="logo_text">Link&Learn</h4>
          <div className="navbar_rightsection">
            <div className="settingandnote_tab">
              <SettingTab />
              <Note openNote={openNote} setOpenNote={setOpenNote} />
            </div>
            <Profile />
          </div>
        </div>
        <hr />
      </nav>
    </>
  );
}

export default Header;
