import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import close from "../../assets/close.svg";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import FacebookShareComponent from "../FacebookShare/FacebookShare";

const AddCompanyForm = ({ onBack, onSubmit, companyData, link, linkid }) => {
  const { showModal, hideModal } = useModal();
  const [company, setCompany] = useState(companyData?.company || "");
  const [brandPhone, setBrandPhone] = useState(companyData?.brandPhone || "");
  const [brandEmail, setBrandEmail] = useState(companyData?.brandEmail || "");
  const [brandWebsite, setBrandWebsite] = useState(
    companyData?.brandWebsite || ""
  );
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jsonData = {
      name: company,
      phone: brandPhone,
      email: brandEmail,
      website: brandWebsite,
    };

    try {
      const response = await axios.post("companies/create/", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const companyId = response.data.id;
      onSubmit({ companyId, company, brandPhone, brandEmail, brandWebsite });
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 z-20">
      <div className="relative bg-white p-6 rounded-[32px] shadow-lg w-full max-w-[800px] h-auto overflow-hidden">
        <div className="flex-col justify-between items-center my-4">
          <h5 className="text-[23px] font-unbounded font-bold text-[#001A45]">
            Fill in the company information
          </h5>
          <p className="text-xl mb-2 font-inter text-[#001A45]">
            so that we can find this company faster
          </p>
          <button
            className="absolute top-6 right-6 text-lg font-bold"
            onClick={hideModal}
          >
            <img src={close} alt="Close" />
          </button>
        </div>
        {error && (
          <div className="p-4 rounded-md bg-red-100 text-red-700 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3 lg:flex lg:gap-4">
            <div className="lg:w-1/2 w-full mb-3">
              <label
                htmlFor="company"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="lg:w-1/2 w-full mb-3">
              <label
                htmlFor="brandPhone"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Brand Phone
              </label>
              <input
                type="text"
                name="brandPhone"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Brand phone"
                value={brandPhone}
                onChange={(e) => setBrandPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 lg:flex lg:gap-4">
            <div className="lg:w-1/2 w-full mb-3">
              <label
                htmlFor="brandEmail"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Brand Email
              </label>
              <input
                type="email"
                name="brandEmail"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Brand email"
                value={brandEmail}
                onChange={(e) => setBrandEmail(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 w-full mb-3">
              <label
                htmlFor="brandWebsite"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Brand Website
              </label>
              <input
                type="url"
                name="brandWebsite"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Brand website"
                value={brandWebsite}
                onChange={(e) => setBrandWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="w-[48%] h-[55px] hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922] text-[18px] font-semibold py-2 px-4 rounded-[12px]"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-[48%] h-[55px] hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922] text-[18px] font-semibold py-2 px-4 rounded-[12px]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyForm;
