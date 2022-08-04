import React, { useState, useMemo, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [passText, setPassText] = useState(false);

  const showPassword = () => {
    setPassText(!passText);
  };

  return (
    <>
      <div className="mb-3 container">
        <h1 className="text-center">Login</h1>
        <label htmlFor="userInput" className="form-label">
          Username
        </label>
        <input
          className="form-control"
          value={username}
          id="userInput"
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
      </div>
      <div className="mb-3 container">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          className="form-control"
          value={password}
          id="passwordInput"
          type={passText ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <i className="bi bi-eye-slash" id="togglePassword"></i>
        <button className="btn btn-primary btn-info" onClick={showPassword}>
          Show Password
        </button>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary btn-info btn-lg border"
            onClick={() => {
              if (username.length > 0 && password.length > 0) {
                login(username);
                navigate("/search");
              }
            }}
          >
            Login
          </button>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary btn btn-info btn-lg"
            type="button"
            onClick={() => navigate("/register")}
          >
            Create New Account
          </button>
        </div>
      </div>
      {}
    </>
  );
}

export default LoginPage;
