import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from "../../context/ModalContext";
import CompanyForm from "../CompanyForm/CompanyForm";
import aboba from "../../assets/aboba.svg";

const OrganizationSection = () => {
  const { showModal } = useModal();

  const handleCreateClick = () => {
    showModal(<CompanyForm />);
  };

  return (
    <section className="text-center px-8 md:px-30 pt-40 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl font-bold">Create Your Organization's Page Today!</h2>
        <div className="text-xl md:text-3xl text-gray-800 font-light mt-2">
          Empower your business by creating a page on our platform. Here's why:
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center flex-wrap gap-8">
        {[
          { title: "1", subtitle: "Build Trust", description: "Showcase your commitment to customer satisfaction and transparency." },
          { title: "2", subtitle: "Direct Communication", description: "Engage directly with your customers to understand and solve their concerns." },
          { title: "3", subtitle: "Enhance Visibility", description: "Increase your online presence and attract new customers." },
          { title: "4", subtitle: "Feedback for Growth", description: "Utilize customer feedback to improve your services and customer experience." },
        ].map((item, index) => (
          <div className="flex-1 max-w-xs" key={index}>
            <div className="inline-block w-10 h-10 rounded-full bg-purple-200 text-white text-3xl font-bold mb-2 flex items-center justify-center">
              {item.title}
            </div>
            <h4 className="text-xl md:text-3xl font-bold mb-2">{item.subtitle}</h4>
            <p className="text-base md:text-xl text-[#001A45] font-light">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <img src={aboba} alt="Circle Background" className="mx-auto" />
        <p className="text-base text-[#001A45] font-bold mx-auto w-full max-w-md">
          Join us and forge stronger relationships with your customers — start by creating your organization’s page now!
        </p>
        <button onClick={handleCreateClick} className="bg-[#001A45] text-white py-2 px-4 rounded-lg mt-4 hover:bg-[#002244] w-1/5">
          Create
        </button>
      </div>
    </section>
  );
};

export default OrganizationSection;
