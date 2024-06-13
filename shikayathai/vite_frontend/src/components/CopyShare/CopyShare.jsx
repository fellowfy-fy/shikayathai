import { useState } from "react";
import { useModal } from "../../context/ModalContext";
import LinkedInShareComponent from "../LinkedInShare/LinkedInShare";

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
    showModal(<LinkedInShareComponent link={link}/>)
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-lg font-bold"
          onClick={hideModal}
        >
          ×
        </button>
        <div className="text-sm md:text-base leading-relaxed p-4">
          <p>
            Your complaint has been submitted successfully! Share this link:
          </p>
          <input type="text" readOnly value={link} className="link-input" />
        </div>
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
