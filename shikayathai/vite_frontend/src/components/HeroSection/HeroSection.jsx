import React, { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import FileComplaintForm from "../FileComplaintForm/FileComplaintForm.jsx";
import hero_1 from "../../assets/hero_1.svg";
import hero_mob from "../../assets/hero_mob.svg";

const HeroSection = () => {
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

  const getImageSrc = () => {
    if (windowWidth < 1000) {
      return hero_mob;
    }
    return hero_1;
  };

  return (
    <section className="bg-[#FFD2BE] w-full rounded-bl-[30px] rounded-br-[30px] px-5 sm:px-24 md:px-30 pt-6 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between relative z-10">
        <div className="lg:pb-[106px] z-10 text-[#001A45]">
          <h1 className="flex flex-col text-[32px] lg:text-[55px] xl:text-[70px] 2xl:text-[120px] font-unbounded font-bold leading-tight">
            <span>MAKE a FREE</span>
            <span>legal claim</span>
          </h1>
          <div className="font-inter font-medium">
            <p className="text-[20px] sm:text-[32px] mt-4">
              We can help resolve your issue or get a refund!
            </p>
            <div className="text-[16px] sm:text-[20px] my-[80px]">
              <p>Shikayathai is a free legal claims platform</p>
              <p>
                You can send a legal notice reviewed by the <br />
                lawyer - directly to the company inbox!
              </p>
            </div>
            <div className="mt-5">
              <button
                className="hover:bg-[#C9FF57] bg-[#B5F62B] active:bg-[#A9E922] sm:w-[312px] w-[100%] h-[55px] rounded-[12px] text-[18px] transition-all"
                onClick={handleFileComplaintClick}
              >
                File now
              </button>
              <div className=" max-w-[312px] flex justify-center">
                <p className="text-[16px] mt-[10px]">It's 100% free</p>
              </div>
            </div>
          </div>
          <img
            className={`${
              windowWidth < 1830 ? "max-w-[600px]" : "max-w-[816px]"
            } w-full h-auto object-contain mt-auto absolute right-0 bottom-0 z-20`}
            src={getImageSrc()}
            alt="Happy couple with smartphones"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
