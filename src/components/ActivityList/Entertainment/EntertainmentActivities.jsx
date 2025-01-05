import { useState, useEffect } from "react";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { PiVideoLight } from "react-icons/pi";
// import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

export default function EntertainmentActivities() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [newLinkName, setNewLinkName] = useState("");

  const [showInput, setShowInput] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);

  const [showShortcutForm, setShowShortcutForm] = useState(false);
  const [newShortcutName, setNewShortcutName] = useState("");
  const [newShortcutURL, setNewShortcutURL] = useState("");
  // const [newShortcutIcon, setNewShortcutIcon] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // fetching the list of links

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchEntLinks = async () => {
      const token = getAuthToken();
      if (!token) {
        const valOk = confirm("You need to log in to view your links");
        if (valOk) {
          navigate("/login");
        }
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/entactivity", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data && data.entLink && Array.isArray(data.entLink)) {
          const mappedEntLinks = data.entLink.map((link) => ({
            id: link._id,
            title: link.title,
            url: link.url,
          }));
          setLinks(mappedEntLinks);
        } else {
          console.error("entLink is not an array or undefined:", data);
          setLinks([]);
        }

        if (
          data &&
          data.entShortcutLink &&
          Array.isArray(data.entShortcutLink)
        ) {
          const mappedShortEntLinks = data.entShortcutLink.map((link) => ({
            id: link._id,
            title: link.title,
            url: link.url,
          }));
          setShortcuts(mappedShortEntLinks);
        } else {
          console.error("entShortcutLink is not an array or undefined:", data);
          setShortcuts([]);
        }
      } catch (err) {
        console.error("Error fetching educational links:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntLinks();
  }, []);

  const handleAddShortcut = async (e) => {
    e.preventDefault();

    const token = getAuthToken();
    if (!token) {
      const valOk = confirm("You need to log in to view your links");
      if (valOk === true) {
        navigate("/login");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/entactivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newShortcutName, url: newShortcutURL }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && newShortcutURL.trim() && newShortcutName.trim()) {
        setShortcuts((prevShortcuts) => [
          ...prevShortcuts,
          {
            id: data.entShortcutLink._id,
            title: data.entShortcutLink.title,
            url: data.entShortcutLink.url,
          },
        ]);
        setNewShortcutName("");
        setNewShortcutURL("");
        setShowShortcutForm(false);
      } else {
        console.error(
          "Failed to add shortcut:",
          data.message || "entShortcutLink is missing"
        );
        alert(
          data.message || "Unexpected error occurred while adding the shortcut."
        );
      }
    } catch (err) {
      console.error("Error adding link:", err);
    }
  };

  const handleDeleteShortcut = async (index) => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to delete tasks.");
      return;
    }
    const linkToDelete = shortcuts[index];
    console.log(linkToDelete);
    try {
      const response = await fetch(
        `http://localhost:3000/entactivity/${linkToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.ok) {
        setShortcuts(shortcuts.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.log("Error deleting the task", err);
    }
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      const valOk = confirm("You need to log in to view your links");
      if (valOk === true) {
        navigate("/login");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/entactivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newLinkName, url: newLink }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && newLink.trim() && newLinkName.trim()) {
        setLinks([
          ...links,
          {
            id: data.entLink._id,
            title: data.entLink.title,
            url: data.entLink.url,
          },
        ]);

        setNewLink("");
        setNewLinkName("");
        setShowInput(false);
      } else {
        console.error("Failed to add link:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error adding link:", err);
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

  const handleDeleteLink = async (index) => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to delete tasks.");
      return;
    }

    const linkToDelete = links[index];
    try {
      const response = await fetch(
        `http://localhost:3000/entactivity/${linkToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setLinks(links.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.log("Error deleting the task", err);
    }
  };

  // const handleIconUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const validTypes = ["image/png", "image/jpeg"];
  //   if (!validTypes.includes(file.type)) {
  //     alert("Only PNG and JPEG files are allowed!");
  //     return;
  //   }
  //   if (file) {
  //     try {
  //       const compressedFile = await imageCompression(file, {
  //         maxSizeMB: 0.1, // Maximum size in MB (adjust as needed)
  //         maxWidthOrHeight: 100, // Resize dimensions
  //         useWebWorker: true,
  //       });
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setNewShortcutIcon(event.target.result); // Store Base64 encoded compressed image
  //       };
  //       reader.readAsDataURL(compressedFile);
  //     } catch (error) {
  //       console.error("Error compressing the image:", error);
  //     }
  //   }
  // };
  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }
  return (
    <div className="entertainment_container">
      <div className="entertainment_label">
        <h3>Entertainment Activities</h3>
        <span>
          <IoAddCircle
            className="activities_add_styles"
            onClick={handleShowInput}
          />
        </span>
      </div>
      <div className="activity_description">
        <h4>Links</h4>
        <p>Add entertaining links such as youtube video links.</p>
      </div>

      <div className="entertianment_input">
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
              placeholder="Link name (e.g.'Funny Video')"
              title="enter the link name (e.g.'Funny Video')"
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
                  <PiVideoLight className="link_type_icon" />
                </span>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
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

      {/*  */}
      <div className="shortcut_section">
        <div className="activity_description">
          <h4>Shortcuts</h4>
          <p>Add learning application shortcuts like Udemy, LeetCode.</p>
        </div>

        <div
          className={`shortcut_grid ${showShortcutForm ? "linksblurred" : ""}`}
        >
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="shortcut_item" title={shortcut.title}>
              <a href={shortcut.url} target="_blank" rel="noopener noreferrer">
                <div className="shortcut_icon">
                  {shortcut.icon ? (
                    <img src={shortcut.icon} alt={shortcut.title} />
                  ) : (
                    shortcut.title[0]
                  )}
                </div>
                <div className="shortcut_name">{shortcut.title}</div>
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
                {/*    <label htmlFor="iconUpload" className="file_input_label">
                  Choose Icon
                </label>
                <p>(Optional)</p>
                <input
                  type="file"
                  id="iconUpload"
                  accept="image/png, image/jpeg"
                  // onChange={(e) => handleIconUpload(e)}
                  className="file_input"
                />*/}
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
  );
}
