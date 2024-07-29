import React, { useState, useEffect } from "react";
import hero_mob from "../../assets/hero_mob.webp";

const HeroMob = () => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full h-[597px] bg-[#FFD2BE] rounded-b-[32px]">
      <div className=" h-[419px] left-[-16px] top-[205px]"></div>
      <div className="absolute flex flex-col items-start gap-2 w-[312px] h-[146px] left-[24px] top-[32px]">
        <h1 className="text-[#001A45] font-unbounded font-bold text-[36px] leading-[45px] uppercase">
          <span>MAKE a FREE</span>
          <span>legal claim</span>
        </h1>
        <div className="w-full">
          <p className="text-[#001A45] font-inter font-medium text-[20px] leading-[24px]">
            We can help resolve your issue or get a refund!
          </p>
        </div>
        <img
          src={hero_mob}
          alt="Happy couple with smartphones"
          className="w-full h-auto mt-auto relative right-0 -bottom-[26px] "
        />
      </div>
    </div>
  );
};

export default HeroMob;
