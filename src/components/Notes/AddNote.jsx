/* eslint-disable react/prop-types */
import "../../styles/notestyles/addnote.css";
import { useState } from "react";

export default function AddNote({ saveNote, cancelNote }) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Personal");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      saveNote({ title, tag, content });
      setTitle("");
      setTag("Personal");
      setContent("");
    }
  };

  return (
    <div className="addNote_container">
      <form onSubmit={handleSubmit}>
        <div className="title_tab">
          <input
            type="text"
            placeholder="Enter the title ..."
            id="title_input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
          <div className="tag_label">
            <h4>#tags</h4>
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option>Personal</option>
              <option>Study</option>
              <option>Work</option>
            </select>
          </div>
        </div>
        <div className="note_content_add">
          <textarea
            placeholder="Write Your Content .. .."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="note_btn">
          <button
            type="button"
            className="btn_cancel"
            onClick={() => cancelNote()}
          >
            Cancel
          </button>
          <button type="submit" className="btn_save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
