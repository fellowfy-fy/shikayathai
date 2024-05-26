import React from "react";
import { BRAND_NAME } from "../../constants";

function Header() {
    return (
      <header className="header">
        <div className="logo">
          <img className="logo-icon" alt="Logo" src="/frame-7.svg" />
          <b className="brand-name">{BRAND_NAME}</b>
        </div>
        <nav className="navigation">
          <button className="nav-item accent-text">Home</button>
          <button className="nav-item">All complaints</button>
          <button className="nav-item">All brand</button>
        </nav>
        <div className="user-profile">
          <img className="user-photo" alt="User Profile" src="/user-photo@2x.png" />
          <div className="nav-item">Profile</div>
        </div>
      </header>
    );
  }


  export default Header;

