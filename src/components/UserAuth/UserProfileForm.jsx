import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/loginForm.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function UserProfileForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleToggleChange = () => {
    setIsRegistering(!isRegistering);
    navigate(isRegistering ? "/login" : "/register");
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={isRegistering}
            onChange={handleToggleChange}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            {isRegistering ? <RegisterForm /> : <LoginForm />}
          </div>
        </label>
      </div>
    </div>
  );
}

export default UserProfileForm;
