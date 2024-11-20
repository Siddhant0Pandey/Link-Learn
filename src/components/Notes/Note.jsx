/* eslint-disable react/prop-types */
import { SlBookOpen, SlNotebook } from "react-icons/sl";

function Note({ openNote, setOpenNote }) {
  const handleNoteBook = () => {
    setOpenNote(!openNote);
  };

  return (
    <div
      className={`notebook_tab ${openNote ? "openNote_style" : ""}`}
      onClick={handleNoteBook}
    >
      <span className="note_icon">
        {openNote ? (
          <>
            <SlBookOpen className="icon hover-icon notetab_icons" />
          </>
        ) : (
          <>
            <SlNotebook className="icon default-icon notetab_icons" />
          </>
        )}
        {/* <SlNotebook className="icon default-icon notetab_icons" />
          <SlBookOpen className="icon hover-icon notetab_icons" /> */}
      </span>
      <p className="note_text">Notes</p>
    </div>
  );
}

export default Note;
