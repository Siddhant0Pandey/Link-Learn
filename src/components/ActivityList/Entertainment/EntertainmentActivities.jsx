import { useState, useEffect } from "react";
// import { BiBookAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
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

  //update the links
  const [updatedLink, setUpdatedLink] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const [toggleUpdate, setToggleUpdate] = useState(false);

  const openWindows = new Map();

  const handleOpenLink = (link) => {
    const startTime = Date.now();
    const newTab = window.open(link, "_blank");

    if (!newTab) return;

    console.log("start time: ", startTime);

    openWindows.set(newTab, startTime);

    const checkTabClosed = setInterval(() => {
      if (newTab.closed) {
        clearInterval(checkTabClosed);
        const endTime = Date.now();
        const timeSpent = Math.floor((endTime - startTime) / 1000);

        console.log("end time", timeSpent);
        if (timeSpent > 0) {
          sendTimeToBackend(link, timeSpent);
        }

        openWindows.delete(newTab);
      }
    }, 1000);
  };

  const sendTimeToBackend = async (link, timeSpent) => {
    // Removed title since it's not needed
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/entactivity/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: link, url: link, timeSpent }),
      });

      const data = await response.json();
      console.log("Time recorded:", data);
    } catch (error) {
      console.error("Error sending time:", error);
    }
  };

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
        // Fetch educational links
        const linksResponse = await fetch(
          "http://localhost:3000/entactivity/link",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const linksData = await linksResponse.json();

        if (Array.isArray(linksData)) {
          const mappedEduLinks = linksData.map((link) => ({
            id: link._id,
            title: link.title,
            url: link.url,
          }));
          setLinks(mappedEduLinks);
        } else {
          console.error("entLink is not an array or undefined:", linksData);
          setLinks([]);
        }

        // Fetch educational shortcuts
        const shortcutsResponse = await fetch(
          "http://localhost:3000/entactivity/shortcut",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const shortcutsData = await shortcutsResponse.json();

        if (
          shortcutsData.eduShortcutLink &&
          Array.isArray(shortcutsData.eduShortcutLink)
        ) {
          setShortcuts(shortcutsData.eduShortcutLink);
        } else {
          // console.error("Unexpected shortcuts response format:", shortcutsData);
          setShortcuts([]);
        }
      } catch (err) {
        console.error("Error fetching educational links and shortcuts:", err);
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
      const response = await fetch(
        "http://localhost:3000/entactivity/shortcut",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newShortcutName, url: newShortcutURL }),
        }
      );
      const data = await response.json();
      console.log("Shortcut Response Data:", data);

      if (response.ok && newShortcutURL.trim() && newShortcutName.trim()) {
        if (data.entShortcutLink) {
          setShortcuts((prevShortcuts) => [
            ...prevShortcuts,
            {
              id: data.entShortcutLink.id,
              title: data.entShortcutLink.title,
              url: data.entShortcutLink.url,
            },
          ]);
        } else {
          console.error("Missing entShortcutLink in response:", data);
          alert(
            "Unexpected error: entShortcutLink is missing in the response."
          );
        }

        setNewShortcutName("");
        setNewShortcutURL("");
        setShowShortcutForm(false);
      } else {
        console.error(
          "Failed to add shortcut:",
          data.message || "Unexpected error"
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
    if (!linkToDelete || !linkToDelete._id) {
      console.error("Shortcut ID is undefined:", linkToDelete);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/entactivity/shortcut/${linkToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setShortcuts(shortcuts.filter((_, i) => i !== index));
      }
    } catch (err) {
      console.error("Error deleting the shortcut", err);
    }
  };
  const handleAddLink = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    if (!token) {
      const valOk = confirm("You need to log in to view your links");
      if (valOk) {
        navigate("/login");
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/entactivity/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newLinkName, url: newLink }),
      });

      const data = await response.json();

      if (response.ok && data) {
        // Update state with the new link
        setLinks((prevLinks) => [
          ...prevLinks,
          { id: data._id, title: data.title, url: data.url },
        ]);

        // Clear input fields
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

  const handleUpdateLink = async (id) => {
    if (!updatedTitle.trim() || !updatedLink.trim()) {
      alert("Please enter a valid title and link before saving.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/entactivity/link/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: updatedTitle,
            url: updatedLink,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the entertainment link");
      }

      const data = await response.json();

      // Ensure the updated object exists in response
      if (!data.eduLink) {
        alert("Unexpected response from server.");
        return;
      }

      // Map through links and replace the updated one
      const updatedLinks = links.map((link) =>
        link.id === id
          ? {
              id: data.eduLink._id,
              title: data.eduLink.title,
              url: data.eduLink.url,
            }
          : link
      );

      setLinks(updatedLinks);
      setToggleUpdate(false);
      setUpdatedTitle("");
      setUpdatedLink("");
      alert("Link updated successfully!");
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Failed to update the educational link.");
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
    setToggleUpdate(false);
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
        `http://localhost:3000/entactivity/link/${linkToDelete.id}`,
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
  //         maxSizeMB: 0.1,
  //         maxWidthOrHeight: 100,
  //         useWebWorker: true,
  //       });
  //       const reader = new FileReader();
  //       reader.onload = (event) => {
  //         setNewShortcutIcon(event.target.result);
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

        {toggleUpdate && (
          <div className="todoInput">
            <input
              type="text"
              placeholder="Enter the updated title"
              className="textinput"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              autoFocus
            />
            <input
              type="url"
              placeholder="Enter the updated URL"
              className="textinput"
              value={updatedLink}
              onChange={(e) => setUpdatedLink(e.target.value)}
            />
            <button
              className="submit"
              onClick={() => handleUpdateLink(toggleUpdate)}
            >
              Save
            </button>
            <button
              className="cancel_button"
              onClick={() => setToggleUpdate(false)}
            >
              Cancel
            </button>
          </div>
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
                <span
                  onClick={() => handleOpenLink(link.url)}
                  className="clickable-link"
                >
                  {link.title}
                </span>
              </div>
              <div className="link_feat_icons">
                <FaRegEdit
                  className="edit_icon"
                  onClick={() => {
                    setUpdatedTitle(link.title); // Pre-fill input fields
                    setUpdatedLink(link.url);
                    setToggleUpdate(link.id);
                  }}
                />
                <IoTrashBinOutline
                  className="delete_icon"
                  onClick={() => handleDeleteLink(index)}
                />{" "}
              </div>
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
