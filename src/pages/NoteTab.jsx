import {
  MdOutlinePlaylistAdd,
  MdOutlinePlaylistAddCheck,
} from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import "../styles/notestyles/notecontainer.css";
import "../styles/notestyles/noteslist.css";
import { useState, useEffect } from "react";
import AddNote from "../components/Notes/AddNote";

function NoteTab() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("userNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    setAddNote(!addNote);
  };

  const saveNote = (newNote) => {
    const noteWithDate = { ...newNote, date: new Date().toDateString() };
    setNotes([...notes, noteWithDate]);
    setAddNote(false);
  };

  const cancelNote = () => {
    setAddNote(false);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="notetab_container">
      <div className="notetab_label">
        <h3>My Notes</h3>
        <div className="addnote_label" onClick={handleAddNote}>
          <span>
            {addNote ? (
              <MdOutlinePlaylistAddCheck className="addNote_icon" />
            ) : (
              <MdOutlinePlaylistAdd className="addNote_icon" />
            )}
          </span>{" "}
          Add
        </div>
      </div>

      {/* Add Note Form */}
      {addNote && (
        <div className="addnotebox">
          <AddNote saveNote={saveNote} cancelNote={cancelNote} />
        </div>
      )}

      {notes.length === 0 ? (
        <div className="empty_message">No notes here, please add one!</div>
      ) : (
        <div className={`notes_list ${addNote ? "noteblurred" : ""}`}>
          {notes.map((note, index) => (
            <div key={index} className="note_item">
              <div className="note_item_label">
                <h4>{note.title}</h4>
                <span
                  className={`${
                    note.tag === "Personal"
                      ? "personal"
                      : note.tag === "Study"
                      ? "study"
                      : "work"
                  }`}
                >
                  # {note.tag}
                </span>
              </div>
              <p>{note.content}</p>
              <div className="note_list_footer">
                <span className="btn_delete" onClick={() => deleteNote(index)}>
                  <IoTrashBinOutline className="notebin" />
                </span>
                <p>{note.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteTab;
