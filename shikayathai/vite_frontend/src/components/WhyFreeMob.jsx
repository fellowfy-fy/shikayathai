import React from "react";
import womanImage from "../assets/woman.png";

const WhyFreeMob = () => {
  return (
    <section className="flex flex-col items-start px-[24px] pt-[40px] pb-[268px] gap-6 bg-[#CBFFBE] w-full relative">
      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex flex-col items-start gap-4 w-full">
          <h1 className="text-[#001A45] font-unbounded font-bold text-[28px] leading-[35px]">
            Why it is free?
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 w-full font-inter">
        <p className="text-[#001A45] font-bold text-[20px] leading-[24px]">
          We believe that it is time for consumers to stand up for their rights!
        </p>
        <p className="text-[#001A45] font-bold text-[20px] leading-[24px]">
          We have created a digital way to achieve justice for everyone and
          prevent malicious companies from taking advantage of the consumer.
        </p>
        <p className="text-[#001A45] font-bold text-[20px] leading-[24px]">
          We help you resolve your issue, get a refund or get a payback from the
          company - and ask you to spread the word about our platform!
        </p>
      </div>
      <p className="text-[#001A45] font-inter font-medium text-[16px] leading-[19px]">
        This is a win-win. :)
      </p>
      <img
        src={womanImage}
        alt="Woman smiling"
        className="absolute bottom-0 right-[1px] w-[258px] h-[258px]"
      />
    </section>
  );
};

export default WhyFreeMob;
