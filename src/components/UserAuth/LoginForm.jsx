import { useNavigate } from "react-router-dom";
import "../../styles/loginForm.css";
import { useState } from "react";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmitForm(e) {
    e.preventDefault();
    const data = { username: userName, password };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              data.message || "Failed to login.Please try again!"
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setError("");
        setSuccessMessage(
          data.message || "Login successful!, Please go to Login Page"
        );
        setLoading(false);
        setUserName("");
        setPassword("");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        setError(err.message || "An unexpected error occurred.");
      });
  }

  return (
    <div className="flip-card__front">
      <div className="title">Log in</div>
      <form className="flip-card__form" onSubmit={handleSubmitForm}>
        {successMessage && <p className="success_msg">{successMessage}</p>}{" "}
        <input
          className="flip-card__input"
          name="username"
          placeholder="UserName"
          value={userName}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        {error && <p className="error_msg">{error}</p>}
        <input
          className="flip-card__input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="flip-card__btn">
          {loading ? "Login.." : "Let`s go!"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
