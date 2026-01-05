import UserLayout from "../../layout/UserLayout";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser } from "../../config/redux/action/authAction";


export default function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  /* ================= REDIRECT AFTER LOGIN ================= */
  useEffect(() => {
    if (loggedIn) {
      navigate("/"); // ✅ correct for Vite
    }
  }, [loggedIn, navigate]);

  /* ================= HANDLE LOGIN ================= */
  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim() || !password.trim()) {
      alert("Please enter both Name and Password");
      return;
    }

    dispatch(loginUser({ name, password }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          
          {/* LEFT: LOGIN FORM */}
          <div className={styles.cardContainer_left}>
            <p className={styles.cardLeft_heading}>Admin Login</p>

            {message && (
              <p
                className={styles.errorMsg}
                style={{ color: isError ? "#ff4757" : "#2ed573" }}
              >
                {message}
              </p>
            )}

            <form onSubmit={handleLogin} className={styles.inputContainers}>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="username"
              />

              <input
                className={styles.inputField}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="submit"
                className={styles.loginBtn}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          {/* RIGHT: INFO */}
          <div className={styles.cardContainer_right}>
            <p>
              Not an Admin?
              <br />
              Go back to Home
            </p>

            <button
              onClick={() => navigate("/")}
              className={styles.backBtn}
            >
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
