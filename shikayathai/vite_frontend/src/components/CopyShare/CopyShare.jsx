import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import LinkedInShareComponent from "../LinkedInShare/LinkedInShare";
import close from "../../assets/close.svg";

const CopyShare = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const { hideModal, showModal } = useModal();

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSkip = () => {
    showModal(<LinkedInShareComponent link={link} />);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-[800px] w-full relative">
        <div className="w-[257px] h-4 flex justify-between items-center z-10 ">
          {/* Fully Opaque Part */}
          <div className="absolute top-[1.90rem] left-[25px] w-[173px] h-1 bg-[#0450CF] z-10"></div>

          {/* Semi-Transparent Part */}
          <div className="absolute top-[1.90rem] left-[25px]  w-[250px] h-1 bg-[#f2f6fd]"></div>

          {/* Dots */}
          <div className="absolute left-6 top-6 w-[257px] flex justify-between items-center z-30">
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-50"></div>
            <div className="rounded-full bg-[#f2f6fd] w-4 h-4"></div>
          </div>
        </div>
        <button
          className="absolute top-6 right-6 text-lg font-bold"
          onClick={hideModal}
        >
          <img src={close} />
        </button>
        <div className="text-sm md:text-base leading-relaxed p-4">
          <p>Share the link with the environment</p>
          <p>Share your complaint on social networks, the more people see it, the more chances there are for its speedy resolution</p>
        </div>
        <input type="text" readOnly value={link} className="link-input" />
        <button
          className="w-full py-2 mt-4 bg-[#B5F62B] text-[#001A45] rounded hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out"
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          className="w-full py-2 mt-4 bg-[#B5F62B] text-[#001A45] rounded hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default CopyShare;
