import React from "react";
import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm.jsx';
import man from "../../assets/man.png";
import mansmall from "../../assets/mansmall.png"; 

const HeroSection = () => {
  const { showModal } = useModal();

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="flex flex-col sm:flex-row justify-between items-start bg-ffd2be border-b-[30px] border-b-left-radius border-b-right-radius h-[800px] sm:h-auto p-6 sm:py-24 sm:pr-14 sm:pl-30 overflow-hidden">
      <div className="space-y-6">
        <div className="text-left">
          <h1 className="block text-8xl font-bold text-001a45 font-unbounded sm:text-4xl">
            <span>FREE</span>
            <span>Complaint</span>
            <span>Platform</span>
          </h1>
          <p className="text-xl text-001a45 font-inter">Turning grievances into wins, guaranteed</p>
          <button className="mt-4 w-80 h-14 bg-b5f62b text-001a45 border-none rounded px-5 py-2.5 text-lg font-medium font-inter hover:bg-a9e922 active:bg-c9ff57 active:scale-95 transition duration-300 ease-in-out"
            onClick={handleFileComplaintClick}>
            File a complaint
          </button>
        </div>
      </div>
      <img className="w-auto h-auto sm:w-[816px] z-10 object-contain hidden sm:block" alt="Happy man holding a card" src={man} />
      <img className="w-92 h-auto z-10 object-contain ml-[-28px] sm:hidden" alt="Happy man holding a card" src={mansmall} />
    </section>
  );
};

export default HeroSection;
