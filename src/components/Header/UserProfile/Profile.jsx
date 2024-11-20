import { IoPersonCircleOutline } from "react-icons/io5";

function Profile() {
  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        background: "#f5f0e5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
