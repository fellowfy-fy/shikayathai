import React from "react";
import { BRAND_NAME } from "../../constants";
import '../../styles/HeaderFooter.css';
import logo from '../../assets/logo.svg'; 


function Header() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" style={{ height: '40px' }} /> {/* Adjust size as needed */}
          {BRAND_NAME}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/complaints">All complaints</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/brands">All brands</a>
            </li>
          </ul>
          <div class="d-flex ms-auto"> {/* This will push the Profile to the right */}
            <a href="/profile" className="btn btn-outline-light">Profile</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
