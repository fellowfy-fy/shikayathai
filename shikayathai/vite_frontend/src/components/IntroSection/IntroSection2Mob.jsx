import React from "react";
import { useModal } from "../../context/ModalContext";
import FileComplaintForm from "../FileComplaintForm/FileComplaintForm.jsx";

const IntroSection2Mob = () => {
  const { showModal } = useModal();

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="flex flex-col items-start p-10 gap-6 w-full bg-white">
      <div className="flex flex-col items-start gap-3 w-full">
        <h1 className="font-unbounded font-bold text-[28px] leading-[35px] text-[#001A45] w-full">
          Welcome to Shikayahai!
        </h1>
        <p className="font-inter font-semibold text-base leading-[19px] text-[#001A45] w-full">
          Here, we make sure your complaints get heard and fixed, fast. File
          Your Complaint Easily:
        </p>
      </div>

      <div>
        <div className="flex flex-col items-start gap-6 w-full">
          <div className="flex flex-row items-start gap-3 w-full">
            <div className="w-6 h-6 bg-[#FFD2BE] rounded-full shrink-0"></div>
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="font-inter font-bold text-xl leading-6 text-[#001A45]">
                Describe Your Issue:
              </h3>
              <p className="font-inter font-medium text-base leading-[19px] text-[#001A45]">
                Let us know what went wrong.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start gap-3 w-full">
            <div className="w-6 h-6 bg-[#FFD2BE] rounded-full shrink-0"></div>
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="font-inter font-bold text-xl leading-6 text-[#001A45]">
                Submit:
              </h3>
              <p className="font-inter font-medium text-base leading-[19px] text-[#001A45]">
                We handle the details, contacting the company and making your
                case public.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start gap-3 w-full">
            <div className="w-6 h-6 bg-[#FFD2BE] rounded-full shrink-0"></div>
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="font-inter font-bold text-xl leading-6 text-[#001A45]">
                See Results:
              </h3>
              <p className="font-inter font-medium text-base leading-[19px] text-[#001A45]">
                Track your complaint's journey to resolution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        className="w-full h-[55px] mt-6 bg-[#B5F62B] rounded-[12px] font-inter font-semibold text-lg text-[#001A45] hover:bg-[#C9FF57] active:bg-[#A9E922]"
        onClick={handleFileComplaintClick}
      >
        File a complaint
      </button>
    </section>
  );
};

export default IntroSection2Mob;
