import facebookIcon from '../../../assets/ico-fb.svg'; 
import googleIcon from '../../../assets/ico-g.svg'; 
import linkedinIcon from '../../../assets/ico-li.svg'; 
import copyIcon from '../../../assets/ico-copy.svg';

const SuccessBanner = ({ id }) => {
  return ( <div className="w-full max-w-[1680px] lg:h-[179px] h-auto rounded-[16px] bg-[#B5F62B4D] mt-[56px] mx-auto p-[20px]">
    <p className="text-[20px] font-bold text-[#001A45] font-inter mb-0">
      Your complaint is added successfully! We will process it ASAP.
    </p>
    <p className="text-[16px] text-[#001A45] font-inter">
      Make your complaint more effective. The more people will see it the higher chances that company will resolve it quickly. Share it on social media!
    </p>
    <div className="flex items-center mt-4 flex-wrap content-start">
      <button className="w-[64px] h-[64px] bg-transparent mr-[8px]">
        <img src={facebookIcon} alt="Facebook" />
      </button>
      <button className="w-[64px] h-[64px] bg-transparent mr-[8px]">
        <img src={googleIcon} alt="Google" />
      </button>
      <button className="w-[64px] h-[64px] bg-transparent mr-[8px]">
        <img src={linkedinIcon} alt="LinkedIn" />
      </button>
      <div className="flex items-center ml-[10px]  border-gray-300  w-[480px] h-[44px] bg-white  border rounded-[12px] border-[#001A45B2] border-opacity-70 my-4 mx-4">
        <input
          type="text"
          value={`shareyourlink.com/${id}`}
          readOnly
          className="w-full h-full pl-2 bg-transparent"
        />
        <button
          className="pr-3 bg-transparent justify-self-end"
          onClick={() => navigator.clipboard.writeText(`shareyourlink.com/${id}`)}
        >
          <img src={copyIcon} alt="Copy" />
        </button>
      </div>
    </div>
  </div>);
};

export default SuccessBanner;
