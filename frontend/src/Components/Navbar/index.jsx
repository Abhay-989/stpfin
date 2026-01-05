import React from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../config/redux/reducer/authReducer";



export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/"); // ✅ Vite navigation
  };

  return (
    <header className={styles.container}>
      <nav className={styles.navBar}>
        
        {/* Logo */}
        <h1
          className={styles.logo}
          onClick={() => navigate("/")}
        >
          Study Point
        </h1>

        {/* Nav Buttons */}
        <div className={styles.navBarOptionContainer}>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className={`${styles.navBtn} ${styles.buttonLogout}`}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`${styles.navBtn} ${styles.buttonJoin}`}
            >
              Admin
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
