import React from "react";
import { BRAND_NAME } from "../../constants";
import "../../styles/Footer.css"

const Footer = () => (
    <footer className="footer">
      <div className="footer-logo">
        <img className="logo-icon" alt="" src="/frame-72.svg" />
        <b className="brand-name">{BRAND_NAME}</b>
      </div>
      <div className="footer-links">
        <button className="link">About Us</button>
        <button className="link">Terms</button>
        <button className="link">Privacy policy</button>
      </div>
      <div className="footer-text">
        <div>{`${BRAND_NAME} 2024 all rights reserved`}</div>
      </div>
    </footer>
  );
  

  export default Footer