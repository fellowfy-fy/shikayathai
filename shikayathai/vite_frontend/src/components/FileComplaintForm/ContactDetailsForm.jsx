import React, { useState } from "react";
import { useModal } from "../../context/ModalContext";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import close from "../../assets/close.svg";
import FacebookShareComponent from "../FacebookShare/FacebookShare";

const ContactDetailsForm = ({ complaintData, onBack }) => {
  const { showModal, hideModal } = useModal();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const registrationResponse = await axios.post("register/", {
        name: userName,
        email: userEmail,
      });
      const { name, access, refresh } = registrationResponse.data;
      setAuth({ name, access, refresh });

      const formData = new FormData();
      formData.append("author", name);
      formData.append("company", complaintData.company);
      formData.append("title", complaintData.title);
      formData.append("brandPhone", complaintData.brandPhone);
      formData.append("brandEmail", complaintData.brandEmail);
      formData.append("brandWebsite", complaintData.brandWebsite);
      formData.append("description", complaintData.description);
      complaintData.photos.forEach((photo) => formData.append("photos", photo));
      complaintData.documents.forEach((document) =>
        formData.append("documents", document)
      );

      const response = await axios.post("complaints/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access}`,
        },
      });
      const linkid = response.data.id;
      const complaintLink = `http://localhost/complaints/${linkid}`;
      showModal(
        <FacebookShareComponent link={complaintLink} linkid={linkid} />
      );
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 z-20">
      <div className="relative bg-white p-6 rounded-[32px] shadow-lg w-full max-w-[800px] h-auto overflow-hidden">
        <div className="w-[257px] h-4 flex justify-between items-center z-10 ">
          {/* Fully Opaque Part */}
          <div className="absolute top-[1.90rem] left-[25px] w-[120px] h-1 bg-[#0450CF] z-10"></div>

          {/* Semi-Transparent Part */}
          <div className="absolute top-[1.90rem] left-[25px] w-[250px] h-1 bg-[#f2f6fd]"></div>

          {/* Dots */}
          <div className="absolute left-6 top-6 w-[257px] flex justify-between items-center z-30">
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#f2f6fd] w-4 h-4 z-50"></div>
          </div>
          <button
            className="absolute top-6 right-6 text-lg font-bold"
            onClick={hideModal}
          >
            <img src={close} alt="Close" />
          </button>
        </div>
        <div className="flex-col justify-between items-center my-4">
          <div>
            <label className="text-[23px] font-unbounded font-bold text-[#001A45]">
              The complaint has been created
            </label>
          </div>
          <div>
            <p className="text-xl mb-2 font-inter text-[#001A45]">
              Fill in the contact details so that we can send information about
              complaint review
            </p>
          </div>
        </div>
        {error && (
          <div className="p-4 rounded-md bg-red-100 text-red-700 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="gap-6 mb-3">
            <div className="w-full mb-3">
              <label
                htmlFor="userName"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Name
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="John"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-5">
              <label
                htmlFor="userEmail"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="john@example.com"
                id="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex-col">
            <button
              type="submit"
              className="w-full h-[55px] hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922] text-[18px] font-semibold mb-5 px-4 rounded-[12px]"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full h-[55px] hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922] text-[18px] font-semibold px-4 rounded-[12px]"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactDetailsForm;
