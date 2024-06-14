import React from "react";
import { BRAND_NAME } from "../../constants";

const IntroSection = () => (
  <section className="text-center px-20 pt-20 pb-10 bg-white">
    <h1 className="text-6xl font-bold text-[#001A45] mb-12">Welcome to {BRAND_NAME}!</h1>
    <p className="text-2xl text-[#001A45] mb-10">
      Here, we make sure your complaints get heard and fixed, fast. File Your Complaint Easily:
    </p>
    <div className="flex justify-between items-center flex-wrap mt-16 mx-auto" style={{ maxWidth: '2048px' }}>
      {[
        {
          number: "1",
          header: "Describe Your Issue:",
          detail: "Let us know what went wrong."
        },
        {
          number: "2",
          header: "Submit:",
          detail: "We handle the details, contacting the company and making your case public."
        },
        {
          number: "3",
          header: "See Results:",
          detail: "Track your complaint's journey to resolution."
        },
        {
          detail: "Our platform aims to foster constructive dialogues between consumers and companies, leading to mutually beneficial resolutions."
        }
      ].map((step, index) => (
        <div key={index} className={`flex-1 ${index < 3 ? 'max-w-xs' : 'max-w-lg'}`} style={index === 3 ? {
            background: 'linear-gradient(to bottom, #F0E8FF, #DCE0FF)',
            width: '640px',
            height: '134px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            borderRadius: '16px'
          } : {}}
        >
        <div className="flex justify-center items-center flex-col max-w-xs">
          {step.number && (
            <div className="w-10 h-10 rounded-full bg-[#001A45] text-white text-2xl font-bold mb-2 flex items-center justify-center">
              {step.number}
            </div>
          )}
          <div className="text-center">
            {step.header && <h3 className="text-4xl font-bold text-[#001A45]">{step.header}</h3>}
            <p className="mt-2 text-xl text-[#001A45]">{step.detail}</p>
          </div>
        </div></div>
      ))}
    </div>
  </section>
);

export default IntroSection;
