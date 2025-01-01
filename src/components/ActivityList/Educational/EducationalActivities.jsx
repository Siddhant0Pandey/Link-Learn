import { useEffect, useState } from "react";
// import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from "react-icons/md";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { BiBookAlt } from "react-icons/bi";
import imageCompression from "browser-image-compression";

export default function EducationalActivities() {
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem("educationalLinks");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [newLink, setNewLink] = useState("");
  const [newLinkName, setNewLinkName] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [shortcuts, setShortcuts] = useState(() => {
    const savedShortcuts = localStorage.getItem("educationalShortcuts");
    return savedShortcuts ? JSON.parse(savedShortcuts) : [];
  });

  const [showShortcutForm, setShowShortcutForm] = useState(false);
  const [newShortcutName, setNewShortcutName] = useState("");
  const [newShortcutURL, setNewShortcutURL] = useState("");
  const [newShortcutIcon, setNewShortcutIcon] = useState("");

  useEffect(() => {
    localStorage.setItem("educationalShortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleAddShortcut = (e) => {
    e.preventDefault();
    if (newShortcutName.trim() && newShortcutURL.trim()) {
      setShortcuts([
        ...shortcuts,
        { name: newShortcutName, url: newShortcutURL, icon: newShortcutIcon },
      ]);
      setNewShortcutName("");
      setNewShortcutURL("");
      setNewShortcutIcon("");
      setShowShortcutForm(false);
    }
  };

  const handleDeleteShortcut = (index) => {
    setShortcuts(shortcuts.filter((_, i) => i !== index));
  };

  const handleAddLink = (e) => {
    e.preventDefault();

    if (newLink.trim() && newLinkName.trim()) {
      setLinks([...links, { name: newLinkName, url: newLink }]);
      setNewLink("");
      setNewLinkName("");
      setShowInput(false);
    }
  };

  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleCancelShortcutForm = () => {
    setNewShortcutName("");
    setNewShortcutURL("");
    setShowShortcutForm(false);
  };
  const handleCancelLinkForm = () => {
    setShowInput(false);
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleIconUpload = async (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      alert("Only PNG and JPEG files are allowed!");
      return;
    }
    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 100,
          useWebWorker: true,
        });
        const reader = new FileReader();
        reader.onload = (event) => {
          setNewShortcutIcon(event.target.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("educationalLinks", JSON.stringify(links));
  }, [links]);
  return (
    <>
      <div className="educational_container">
        <div className="educational_label">
          <h3>Educational Activities</h3>
          <span>
            <IoAddCircle
              className="activities_add_styles"
              onClick={handleShowInput}
            />
          </span>
        </div>

        <div className="activity_description">
          <h4>Links</h4>
          <p>Add learning links such as youtube tutorials links.</p>
        </div>
        <div className="educational_input">
          {showInput && (
            <form onSubmit={handleAddLink} className="activity_link_add">
              <input
                type="url"
                placeholder="Enter the URL"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="link_url"
                autoFocus
                required
              />
              <input
                type="text"
                placeholder="Link name (e.g.'JS tutorial')"
                title="Enter the link name(e.g.'JS tutorial')"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                required
              />

              <button type="submit" className="submit">
                Add
              </button>
              <button
                type="button"
                className="cancel_button"
                onClick={() => handleCancelLinkForm()}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        <ul className={`link_list ${showInput ? "linksblurred" : ""}`}>
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index} className="link_item">
                <div className="link_label">
                  <span>
                    <BiBookAlt className="link_type_icon" />
                  </span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                  </a>
                </div>
                <IoTrashBinOutline
                  className="delete_icon"
                  onClick={() => handleDeleteLink(index)}
                />
              </li>
            ))
          ) : (
            <p className="empty_message">No links added yet.</p>
          )}
        </ul>

        {/* <div className="add_link_style" onClick={handleShowInput}>
        {showInput ? (
          <MdOutlineBookmarkAdded className="addlinkicon" />
        ) : (
          <MdOutlineBookmarkAdd className="addlinkicon" />
        )}
        Add Links
      </div> */}
        <div className="shortcut_section">
          <div className="activity_description">
            <h4>Shortcuts</h4>
            <p>Add learning application shortcuts like Udemy, LeetCode.</p>
          </div>
          <div
            className={`shortcut_grid ${
              showShortcutForm ? "linksblurred" : ""
            }`}
          >
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut_item" title={shortcut.name}>
                <a
                  href={shortcut.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="shortcut_icon">
                    {shortcut.icon ? (
                      <img src={shortcut.icon} alt={shortcut.name} />
                    ) : (
                      shortcut.name[0]
                    )}
                  </div>
                  <div className="shortcut_name">{shortcut.name}</div>
                </a>
                <IoTrashBinOutline
                  className="shortcuts_delete_icon"
                  onClick={() => handleDeleteShortcut(index)}
                />
              </div>
            ))}

            {shortcuts.length < 5 ? (
              <div
                className="shortcut_tab"
                onClick={() => setShowShortcutForm(!showShortcutForm)}
              >
                <IoAddCircleOutline className="activities_add_shortcuts" />
              </div>
            ) : (
              <div className="shortcut_locked">
                <p>Unlock more slots with achievements!</p>
              </div>
            )}
          </div>

          {showShortcutForm && (
            <div className="shortcut_form">
              <form onSubmit={handleAddShortcut}>
                <div className="shortcut_form_input">
                  <input
                    type="text"
                    placeholder="Shortcut Name (e.g., Udemy)"
                    value={newShortcutName}
                    onChange={(e) => setNewShortcutName(e.target.value)}
                    required
                  />
                  <input
                    type="url"
                    placeholder="Shortcut URL (e.g., https://udemy.com)"
                    value={newShortcutURL}
                    onChange={(e) => setNewShortcutURL(e.target.value)}
                    className="link_url"
                    required
                  />
                  <label htmlFor="iconUpload" className="file_input_label">
                    Choose Icon
                  </label>
                  <p>(Optional)</p>
                  <input
                    type="file"
                    id="iconUpload"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleIconUpload(e)}
                    className="file_input"
                  />
                </div>
                <div className="shortcut_form_btns">
                  <button type="submit" className="submit">
                    Add Shortcut
                  </button>
                  <button
                    type="button"
                    className="cancel_button"
                    onClick={() => handleCancelShortcutForm()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
