import { IoPersonCircleOutline } from "react-icons/io5";

function Profile() {
  return (
    <div className="profile_box">
      <h5 className="profile_text">Name</h5>
      <IoPersonCircleOutline
        style={{
          width: "30px",
          height: "30px",
          color: "#009963",
        }}
      />
    </div>
  );
}

export default Profile;
