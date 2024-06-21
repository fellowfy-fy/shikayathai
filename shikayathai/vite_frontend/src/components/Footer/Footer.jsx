import React from "react";
import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#001A45] text-white p-5 text-sm w-full flex flex-col items-center justify-between mt-4">
      <div className="flex items-center justify-center text-[rgba(255,255,255,0.5)]">
        <img src={logo} alt="Shikayahai Logo" className="mr-2.5" />
        <p className="font-bold text-lg m-0">Shikayahai</p>
      </div>
      <div className="flex justify-between items-center w-full mt-4 md:flex-row">
        <div className="text-left">
          <ul className="list-none p-0">
            <li className="mb-2.5">
              <a href="/about-us" className="no-underline text-white hover:underline">About Us</a>
            </li>
            <li className="mb-2.5">
              <a href="/terms" className="no-underline text-white hover:underline">Terms</a>
            </li>
            <li className="mb-2.5">
              <a href="/privacy-policy" className="no-underline text-white hover:underline">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="text-right">
          <p className="m-0 mb-2.5">Noida</p>
          <p className="m-0 mb-2.5">+91-8447078784</p>
        </div>
      </div>
      <p className="text-[rgba(255,255,255,0.5)] mt-4">Shikayahai 2024 all rights reserved</p>
    </footer>
  );
};

export default Footer;
