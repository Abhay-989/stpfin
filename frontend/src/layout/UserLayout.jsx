import React from "react";
import NavBarComponent from "@/Components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* NavBar */}
      <NavBarComponent />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "1rem 2rem" }}>
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
