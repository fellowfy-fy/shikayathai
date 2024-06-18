import React, { useState, useEffect } from "react";
import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm.jsx';
import man from "../../assets/man.png";
import mansmall from "../../assets/mansmall.png"; 

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getImageSrc = () => {
    if (windowWidth < 1000) {
      return mansmall;
    }
    return man;
  };

  return (
    <section className="bg-[#FFD2BE] w-full rounded-bl-[30px] rounded-br-[30px] px-5 sm:px-24 md:px-30 pt-6">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div className="text-left max-w-lg">
          <h1 className="flex flex-col text-[32px] sm:text-[128px] font-unbounded font-bold text-[#001A45] leading-tight">
            <span>FREE</span>
            <span>Complaint</span>
            <span>Platform</span>
          </h1>
          <p className="text-[20px] sm:text-[24px] font-inter font-medium text-[#001A45] mt-4">
            Turning grievances into wins, guaranteed
          </p>
          <button 
            className="mt-5 bg-[#B5F62B] hover:bg-[#A9E922] active:bg-[#C9FF57] text-[#001A45] sm:w-[312px] w-[100%] h-[55px] rounded-[12px] font-inter font-medium text-[18px] transition-all mx-auto sm:mx-0 md:mx-0"
            onClick={handleFileComplaintClick}
          >
            File a complaint
          </button>
        </div>
        <img 
          className={`${windowWidth < 1830 ? 'max-w-[600px]' : 'max-w-[816px]'} w-full h-auto object-contain mt-auto`}
          src={getImageSrc()} 
          alt="Happy man holding a card"
        />
      </div>
    </section>
  );
};

export default HeroSection;
