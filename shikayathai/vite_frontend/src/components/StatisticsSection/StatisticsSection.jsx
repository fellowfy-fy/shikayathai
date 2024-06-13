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
    <section className="text-center p-8 bg-gradient-to-b from-[#F7E5FF] to-[#FFE5C6] rounded-lg flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Shikayathai Logo" className="w-6 h-auto" />
        <h2 className="text-lg font-bold text-[#001A45] m-0 font-unbounded">Shikayathai</h2>
      </div>
      <h3 className="text-xl font-bold font-unbounded">in numbers</h3>
      <div className="flex justify-center gap-12 flex-wrap">
        <div className="text-center">
          <h3 className="text-4xl font-bold text-[#001A45] m-0 font-unbounded">1 500 000+</h3>
          <p className="text-base text-gray-700 m-0">active users</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold text-[#001A45] m-0 font-unbounded">32 000+</h3>
          <p className="text-base text-gray-700 m-0">active companies</p>
        </div>
        <div className="text-center">
          <h3 className="text-4xl font-bold text-[#001A45] m-0 font-unbounded">8 000 000+</h3>
          <p className="text-base text-gray-700 m-0">resolved requests</p>
        </div>
        <button onClick={handleFileComplaintClick} className="bg-white border border-[#001A45] text-[#001A45] py-2 px-4 font-semibold rounded-lg w-80 h-14 hover:bg-blue-100">File a complaint</button>
      </div>
    </section>
  );
};

export default StatisticsSection;
