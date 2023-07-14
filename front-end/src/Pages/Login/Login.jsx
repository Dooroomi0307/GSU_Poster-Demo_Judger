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
        window.location.href = "/participantlist";
        break;
      case "judge":
        window.location.href = "/partlist";
        break;
      case "participant":
        window.location.href = "";
        break;
      default:
        setErrorMessage("Invalid user type.");
        break;
    }
  };

  return (
    <div class="all">
    <div class="body">
      <header >
        <h1 class="h1"> GSU   DEMO   DAY</h1>
      </header>

      <div class="form">
        <h2 class="h2">LOGIN</h2>
        
        <label class="label"> Username</label>
        <input class="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
       <label class="label"> Password </label>
        <input class="input"
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
    </div>
    </div>
  );
};

export default LoginForm;
