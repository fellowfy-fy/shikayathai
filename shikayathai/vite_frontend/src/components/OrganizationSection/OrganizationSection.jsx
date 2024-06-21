import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm';
import aboba from "../../assets/aboba.svg";

const OrganizationSection = () => {
  const { showModal } = useModal();

  const handleCreateClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="text-left sm:text-center items-left sm:items-center mx-[24px] sm:mx-[120px] pb-[40px] pt=[20px] sm:pt-40 sm:pb-20">
      <div className="mb-8">
        <h2 className="text-[24px] sm:text-[32px] font-unbounded font-bold text-[#001A45]">Create Your Organization's Page Today!</h2>
        <div className="text-[18px] sm:text-[24px] font-inter font-light mt-2 text-[#001A45]">
          Empower your business by creating a page on our platform. Here's why:
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-around flex-wrap gap-8 text-left sm:text-center items-left sm:items-center">
        {[
          { title: "1", subtitle: "Build Trust", description: "Showcase your commitment to customer satisfaction and transparency." },
          { title: "2", subtitle: "Direct Communication", description: "Engage directly with your customers to understand and solve their concerns." },
          { title: "3", subtitle: "Enhance Visibility", description: "Increase your online presence and attract new customers." },
          { title: "4", subtitle: "Feedback for Growth", description: "Utilize customer feedback to improve your services and customer experience." },
        ].map((item, index) => (
          <div className="flex justify-center text-left sm:text-center items-left sm:items-center flex-col max-w-xs" key={index}>
            <div className="w-10 h-10 rounded-full bg-purple-200 text-white text-2xl font-unbounded font-bold mb-2 flex items-center justify-center">
              {item.title}
            </div>
            <h4 className="text-2xl text-[#001A45] md:text-3xl font-bold mb-2">{item.subtitle}</h4>
            <p className="text-base sm:text-xl text-[#001A45] font-light">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <img src={aboba} alt="Circle Background" className="mx-auto" />
        <p className="text-base text-[#001A45] font-bold mx-auto w-full max-w-md text-center">
          Join us and forge stronger relationships with your customers — start by creating your organization’s page now!
        </p>
        <button onClick={handleCreateClick} className="bg-[#001A45] text-white text-[18px] py-2 px-4 rounded-[12px] mt-4 hover:bg-opacity-70 active:bg-black w-[312px] h-[56px] ">
          Create
        </button>
      </div>
    </section>
  );
};

export default OrganizationSection;
