import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import api from "../../api/axios";
import facebookIcon from "../../assets/ico-fb.svg";
import googleIcon from "../../assets/ico-g.svg";
import linkedinIcon from "../../assets/ico-li.svg";
import close from "../../assets/close.svg";
import LoginComponent from "../LoginComponent/LoginComponent.jsx";

const RegistrationComponent = () => {
  const { hideModal, showModal } = useModal();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.repassword) {
      setError("Passwords must match.");
      return;
    }
    try {
      const response = await api.post("/register/", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      showModal(<LoginComponent />);
    } catch (error) {
      setError(
        error.response.data.message || "An error occurred during registration."
      );
    }
  };

  const handleLoginClick = () => {
    showModal(<LoginComponent />);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
      <div className="bg-white px-[24px] lg:w-[800px] lg:h-[610px] lg:rounded-[32px] h-full lg:shadow-xl overflow-hidden">
        <div className="modal-header flex justify-between items-center pb-3 overflow-auto">
          <h5 className="modal-title mt-[76px] text-[#001A45] text-[32px] font-inter font-bold">
            Create an account
          </h5>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button onClick={hideModal} className="text-lg font-semibold">
            <img src={close}></img>
          </button>
        </div>
        <p className="text-[16px] text-[#001A45] font-inter font-medium">
          To create complaints and track their status
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <label
                htmlFor="name"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="John"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="lg:w-1/2">
              <label
                htmlFor="email"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="john@example.com"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <label
                htmlFor="password"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Enter Your password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="lg:w-1/2">
              <label
                htmlFor="repassword"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Repeat Password
              </label>
              <input
                type="password"
                name="repassword"
                id="repassword"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Repeat the password"
                value={userData.repassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-[55px] justify-center rounded-[12px] text-[18px] font-medium hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922]"
          >
            Create an account
          </button>
        </form>
        <div>
          <label className="block mt-[20px] text-[24px] font-inter font-bold text-[#001A45]">
            Or registration via social media
          </label>
          <div className="flex gap-3 mt-[16px]">
            <button className="w-[64px] h-[64px] bg-transparent">
              <img src={googleIcon} alt="Google" />
            </button>
            <button className="w-[64px] h-[64px] bg-transparent">
              <img src={facebookIcon} alt="Facebook" />
            </button>
            <button className="w-[64px] h-[64px] bg-transparent">
              <img src={linkedinIcon} alt="LinkedIn" />
            </button>
          </div>
          <button
            onClick={handleLoginClick}
            className="mt-[20px] font-inter font-bold text-[18px] text-[#0450CF] hover:text-[#0450CF] hover:underline"
          >
            Already have an account? Log in to it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
