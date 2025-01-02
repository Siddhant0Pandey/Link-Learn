import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function Profile() {
  const [username, setUserName] = useState("");
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("name");
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  function toggleLogout(e) {
    e.preventDefault();
    setLogout(!logout);
  }

  function handleLogout() {
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className="profile_box" onClick={toggleLogout}>
        <h5 className="profile_text">{username}</h5>
        <IoPersonCircleOutline
          style={{
            width: "30px",
            height: "30px",
            color: "#009963",
          }}
        />
      </div>
      {logout && (
        <div className="logout_box">
          <span>
            <IoIosLogOut
              style={{
                width: "20px",
                height: "20px",
                paddingTop: "3px",
              }}
              className="logout_icon"
            />
          </span>
          <Link to="/login" className="logout_text" onClick={handleLogout}>
            LogOut
          </Link>
        </div>
      )}
    </>
  );
}

export default Profile;
