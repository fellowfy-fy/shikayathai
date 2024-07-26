import React, { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import FileComplaintForm from "../FileComplaintForm/FileComplaintForm.jsx";

const ExtraMob = () => {
  const { showModal } = useModal();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="flex flex-col items-center p-4 gap-4 w-full h-[231px] bg-white">
      <div className="flex flex-col items-start p-0 gap-2 w-full">
        <p className="text-[#001A45] font-inter font-medium text-[16px] leading-[19px]">
          Shikayathai is a free legal claims platform
        </p>
        <p className="text-[#001A45] font-inter font-medium text-[16px] leading-[19px]">
          You can send a legal notice reviewed by the <br />
          lawyer - directly to the company inbox!
        </p>
      </div>
      <div className="flex flex-col items-start p-0 gap-2 w-full">
        <button
          className="flex justify-center items-center p-2 gap-2 w-full h-[55px] bg-[#B5F62B] rounded-[12px] text-[#001A45] font-inter font-semibold text-[18px] leading-[22px]"
          onClick={handleFileComplaintClick}
        >
          File now
        </button>
        <div className="flex justify-center w-full">
          <p className="text-center text-[#001A45] font-inter font-medium text-[14px] leading-[17px]">
            It's 100% free
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExtraMob;
