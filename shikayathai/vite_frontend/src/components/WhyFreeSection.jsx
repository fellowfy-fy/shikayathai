import React from "react";
import womanImage from "../assets/woman.png";

const WhyFreeSection = () => {
  return (
    <section className="bg-[#CBFFBE] h-auto px-[24px] md:px-[120px] md:py-[80px] w-full relative">
      <div className="flex flex-row items-start gap-[120px]">
        <div className="w-1/2 flex flex-col items-start">
          <div className="relative ">
            <h1 className="text-[64px] font-unbounded font-bold text-[#001A45] mb-2">
              Why it is free?
            </h1>
            <p className="text-[24px] font-inter text-[#001A45]">
              This is a win-win. :)
            </p>
          </div>
        </div>

        <div className="w-1/2 flex flex-col items-start">
          <p className="text-[32px] font-inter text-[#001A45] mb-6">
            We believe that it is time for consumers to stand up for their
            rights!
          </p>
          <p className="text-[32px] font-inter text-[#001A45] mb-6">
            We have created a digital way to achieve justice for everyone and
            prevent malicious companies from taking advantage of the consumer.
          </p>
          <p className="text-[32px] font-inter text-[#001A45]">
            We help you resolve your issue, get a refund or get a payback from
            the company - and ask you to spread the word about our platform!
          </p>
        </div>
      </div>
      <img
        src={womanImage}
        alt="Woman smiling"
        className="absolute bottom-0 left-[320px] w-[386px] h-[386px]"
      />
    </section>
  );
};

export default WhyFreeSection;
