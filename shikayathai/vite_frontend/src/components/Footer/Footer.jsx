import React from "react";
import { BRAND_NAME } from "../../constants";
import "./Footer.css";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
       <div className="footer-logo-name">
          <img src={logo} alt="Shikayahai Logo" className="footer-logo" />
          <p className="footer-name">Shikayahai</p>
        </div>
      <div className="footer-center">
      <div className="footer-left">
        <ul>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/privacy-policy">Privacy policy</a></li>
        </ul>
      </div>
      <div className="footer-right">
        <p>Noida</p>
        <p>+91-8447078784</p>
      </div>
      </div>
      <p className="footer-rights">Shikayahai 2024 all rights reserved</p>
    </footer>
  );
};

export default Footer;