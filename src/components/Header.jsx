import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../assets/logo.png";
import profileIcon from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/profile"); // Navigate to the /profile route
  };

  return (
    <header>
      {/* Add an onClick to navigate to the homepage when the logo is clicked */}
      <img
        className="site-logo"
        src={logo}
        alt="Logo"
        onClick={() => navigate("/")} // Navigate to homepage on logo click
      />

      <div className="header-buttons">
        <button onClick={goToProfile}>
          <img src={profileIcon} alt="Account Icon" />
          <span>Account</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
