import { useState } from "react";
import "../../styles/loginForm.css";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const data = { name, username: userName, password };

    fetch("http://localhost:3000/register", {
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
              data.message || "Failed to register. Please try again."
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setError("");
        setSuccessMessage(
          data.message || "Registration successful!, Please go to Login Page"
        );
        setLoading(false);
        setName("");
        setUserName("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        setError(err.message || "An unexpected error occurred.");
      });
  }

  return (
    <div className="flip-card__back">
      <div className="title">Sign up</div>
      <form className="flip-card__form" onSubmit={handleSubmit}>
        {successMessage && <p className="success_msg">{successMessage}</p>}

        {error && <p className="error_msg">{error}</p>}

        <input
          className="flip-card__input"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="flip-card__input"
          name="username"
          placeholder="Username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="flip-card__input"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="flip-card__btn" disabled={loading}>
          {loading ? "Registering..." : "Confirm!"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
