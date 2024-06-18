import React from 'react';
import { BRAND_NAME } from "../../constants";

const IntroSection = () => (
  <section className="px-8 pt-40 pb-20 bg-white text-left md:text-center">
    <div className="mb-8">
      <h1 className="text-2xl md:text-6xl font-unbounded font-bold text-[#001A45]">{`Welcome to ${BRAND_NAME}!`}</h1>
      <p className="text-xl md:text-2xl text-[#001A45] font-inter font-light mt-2">
        Here, we make sure your complaints get heard and fixed, fast. File Your Complaint Easily:
      </p>
    </div>
    <div className="flex flex-col md:flex-row justify-around items-center flex-wrap gap-8">
      {[
        {
          title: "1",
          subtitle: "Describe Your Issue",
          description: "Let us know what went wrong."
        },
        {
          title: "2",
          subtitle: "Submit",
          description: "We handle the details, contacting the company and making your case public."
        },
        {
          title: "3",
          subtitle: "See Results",
          description: "Track your complaint's journey to resolution."
        }
      ].map((item, index) => (
        <div className="flex justify-start md:justify-center items-center flex-col max-w-xs" key={index}>
          <div className="w-10 h-10 rounded-full bg-[#001A45] text-white text-2xl font-unbounded font-bold mb-2 flex items-center justify-center">
            {item.title}
          </div>
          <h3 className="text-xl md:text-3xl font-inter font-bold mb-2 text-[#001A45]">{item.subtitle}</h3>
          <p className="text-base font-inter md:text-xl text-[#001A45]">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default IntroSection;
