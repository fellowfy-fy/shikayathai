import React from "react";

const FAQSection = () => (
  <section className="bg-white py-[20px] md:py[80px]">
    <div className="text-left md:text-center mb-7.5">
      <div>
        <b className="text-[24px] sm:text-[32px] text-[#001A45] font-unbounded px-[24px] sm:mx-[120px]">FAQ</b>
      </div>
      <div className="text-[18px] sm:text-[24px] text-[#001A45] mt-2.5 text-left md:text-center px-[24px] sm:mx-[120px]">Your Guide to Getting Heard</div>
    </div>
    <div className="ml-2 mr-2 mx-[24px] sm:mx-[120px] bg-white p-5">
      <div className="bg-[#f4f4f4] p-5 mb-5 rounded-lg">
        <b className="text-2xl text-[#001A45]">How do I file a complaint?</b>
        <div className="text-xl text-[#001A45] mt-2.5">
          Just share your ordeal, and we'll escalate it - both on our
          platform and by filing an official complaint through the Indian
          Consumer Helpline and directly to the company.
        </div>
      </div>
      <div className="bg-[#f4f4f4] p-5 mb-5 rounded-lg">
        <b className="text-2xl text-[#001A45]">Will my complaint be public?</b>
        <div className="text-xl text-[#001A45] mt-2.5">
          Absolutely, amplifying the pressure for swift action.
        </div>
      </div>
      <div className="bg-[#f4f4f4] p-5 mb-5 rounded-lg">
        <b className="text-2xl text-[#001A45]">What happens after filing?</b>
        <div className="text-xl text-[#001A45] mt-2.5">
          We lodge your complaint officially with the Indian Consumer Helpline and the company itself, doubling down on getting you a resolution.
        </div>
      </div>
      <div className="bg-[#f4f4f4] p-5 mb-5 rounded-lg">
        <b className="text-2xl text-[#001A45]">Can I pull my complaint back?</b>
        <div className="text-xl text-[#001A45] mt-2.5">
          Yes, if you’re satisfied or wish to retract, just say the word.
        </div>
      </div>
      <div className="bg-[#f4f4f4] p-5 mb-5 rounded-lg">
        <b className="text-2xl text-[#001A45]">Who sees my issue?</b>
        <div className="text-xl text-[#001A45] mt-2.5">
          The world, plus we go the extra mile by notifying the Indian Consumer Helpline and the concerned company.
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
