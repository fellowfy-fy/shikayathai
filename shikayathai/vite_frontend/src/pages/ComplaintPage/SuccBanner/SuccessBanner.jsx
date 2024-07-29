import React, { useState, useEffect } from "react";
import facebookIcon from "../../../assets/ico-fb.svg";
import googleIcon from "../../../assets/ico-g.svg";
import linkedinIcon from "../../../assets/ico-li.svg";
import copy from "../../../assets/ico-copy.svg";

const SuccessBanner = ({ id }) => {
  const [copied, setCopied] = useState(false);
  const [currentLink, setCurrentLink] = useState(""); // State to store the current page URL

  // useEffect hook runs when the component mounts
  useEffect(() => {
    // Set the currentLink state to the current page URL
    setCurrentLink(window.location.href);
  }, []); // Empty dependency array ensures this runs only once, on mount

  // Function to share on Facebook
  const shareOnFacebook = () => {
    // Encode the current URL and open the Facebook share dialog in a new tab
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentLink)}`;
    window.open(url, "_blank");
  };

  // Function to share on LinkedIn
  const shareOnLinkedIn = () => {
    // Encode the current URL and open the LinkedIn share dialog in a new tab
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentLink)}`;
    window.open(url, "_blank");
  };

  // Function to copy the link to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(currentLink).then(() => {
      setCopied(true); // Set copied state to true to show "Copied!" message
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    <div className="w-full max-w-[1680px] lg:h-[179px] h-auto rounded-[16px] bg-[#B5F62B4D] mt-[56px] mx-auto p-[20px]">
      <p className="text-[20px] font-bold text-[#001A45] font-inter mb-0">
        Your complaint is added successfully! We will process it ASAP.
      </p>
      <p className="text-[16px] text-[#001A45] font-inter">
        Make your complaint more effective. The more people will see it the
        higher chances that company will resolve it quickly. Share it on social
        media!
      </p>
      <div className="flex flex-col sm:flex-row mt-4 flex-wrap items-left md:items-center">
        <div className="flex flex-row mb-[16px] sm:mb-0">
          <button
            className="w-[64px] h-[64px] bg-transparent mr-[8px]"
            onClick={shareOnFacebook}
          >
            <img src={facebookIcon} alt="Facebook" />
          </button>
          <button className="w-[64px] h-[64px] bg-transparent mr-[8px]">
            <img src={googleIcon} alt="Google" />
          </button>
          <button
            className="w-[64px] h-[64px] bg-transparent mr-[8px]"
            onClick={shareOnLinkedIn}
          >
            <img src={linkedinIcon} alt="LinkedIn" />
          </button>
        </div>
        <div className="bg-white relative w-full max-w-[480px] h-[44px] p-3 border rounded-[12px] border-[#001A45B2] border-opacity-70 flex items-center">
          <input
            type="text"
            readOnly
            value={currentLink} // Display the current page URL
            className="link-input w-full sm:text-[16px] text-[13px] "
          />
          <button className="absolute right-3" onClick={handleCopy}>
            <img src={copy} alt="Copy" />
          </button>
          {copied && (
            <span className="absolute right-10 text-green-500 text-[13px] sm:text-[16px] ">
              Copied!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessBanner;
