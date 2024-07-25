import React from "react";
import womanImage from "../assets/woman.png";

const WhyFreeSection = () => {
  return (
    <section className=" bg-[#CBFFBE] h-[536px] px-[120px] w-full">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start font-unbounded">
          <h1 className="text-[64px] font-bold text-[#001A45] mb-2">
            Why it is free?
          </h1>
          <p className="text-[24px] text-[#001A45] mb-8">
            This is a win-win. :)
          </p>
          <div className=" flex-shrink-0">
            <img
              src={womanImage}
              alt="Woman smiling"
              className="w-[386px] h-[386px] object-contain"
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start font-inter">
          <p className="text-[32px] text-[#001A45] mb-6">
            We believe that it is time for consumers to stand up for their
            rights!
          </p>
          <p className="text-[32px] text-[#001A45] mb-6">
            We have created a digital way to achieve justice for everyone and
            prevent malicious companies from taking advantage of the consumer.
          </p>
          <p className="text-[32px] text-[#001A45]">
            We help you resolve your issue, get a refund or get a payback from
            the company - and ask you to spread the word about our platform!
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyFreeSection;