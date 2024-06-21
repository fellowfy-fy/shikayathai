import React from "react";
import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm';
import logo from '../../assets/invlogo.svg';

const StatisticsSection = () => {
  const { showModal } = useModal();

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="px-[24px] sm:px-[120px] py-[40px] sm:py-[20px] h-[504px] sm:h-[236px] bg-gradient-to-b from-[#F7E5FF] to-[#FFE5C6] rounded-[48px] text-left sm:text-center flex flex-col items-left sm:items-center justify-left sm:justify-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shikayathai Logo" className="w-6 h-auto" />
        <h2 className="text-lg font-bold text-[#001A45] font-unbounded">Shikayathai</h2>
      </div>
      <h3 className="text-[24px] font-bold font-unbounded text-[#001A45]">in numbers</h3>
      <div className="mt-[24px] flex justify-left sm:justify-center gap-[24px] flex-wrap">
        <div className="text-left sm:text-center">
          <h3 className="text-3xl font-bold text-[#001A45] m-0 font-unbounded">1 500 000+</h3>
          <p className="text-xl font-inter font-bold text-[#001A45]">active users</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold text-[#001A45] m-0 font-unbounded">32 000+</h3>
          <p className="text-xl font-inter font-bold text-[#001A45] items-left">active companies</p>
        </div>
        <div className="text-left sm:text-center">
          <h3 className="text-3xl font-bold text-[#001A45] m-0 font-unbounded">8 000 000+</h3>
          <p className="text-xl font-inter font-bold text-[#001A45] items-left">resolved requests</p>
        </div>
        <button onClick={handleFileComplaintClick} className="bg-white border border-[#001A45] text-[#001A45] justify-center py-2 px-4 font-semibold rounded-[12px] w-80 h-14  hover:border-opacity-70 hover:text-opacity-70 active:border-opacity-70 active:text-opacity-70 active:bg-opacity-5">File a complaint</button>
      </div>
    </section>
  );
};

export default StatisticsSection;
