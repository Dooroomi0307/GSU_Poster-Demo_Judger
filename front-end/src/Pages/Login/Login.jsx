import React, { useState } from "react";
import users from "./database.js";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter a valid username and password.");
    } else {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        redirectToPage(user.type);
      } else {
        setErrorMessage("Invalid username or password.");
      }
    }
  };

  const redirectToPage = (userType) => {
    switch (userType) {
      case "admin":
        window.location.href = "/Analysis";
        break;
      case "judge":
        window.location.href = "/participantList";
        break;
      case "participant":
        window.location.href = "/participantList";
        break;
      default:
        setErrorMessage("Invalid user type.");
        break;
    }
  };

  return (
    <div className="cover">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="login-btn" onClick={handleLogin}>
        Login
      </div>
    </div>
  );
};

export default LoginForm;


