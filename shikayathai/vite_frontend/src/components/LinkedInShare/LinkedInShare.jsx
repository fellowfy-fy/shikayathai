import { useModal } from "../../context/ModalContext";
import linkedin from "../../assets/linkedinLogo.svg"
import close from "../../assets/close.svg"

const LinkedInShareComponent = ({ link }) => {
  const { hideModal } = useModal();

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}`;
    window.open(url, "_blank");
  };

  const handleSkip = () => {
    hideModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-[32px] max-w-[800px] w-full relative">
        <div className="w-[257px] h-4 flex justify-between items-center z-10 ">
          {/* Fully Opaque Part */}
          <div className="absolute top-[1.90rem] left-[25px] w-[250px] h-1 bg-[#0450CF] z-10"></div>

          {/* Semi-Transparent Part */}
          <div className="absolute top-[1.90rem] left-[25px]  w-[250px] h-1 bg-[#f2f6fd]"></div>

          {/* Dots */}
          <div className="absolute left-6 top-6 w-[257px] flex justify-between items-center z-30">
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-50"></div>
            <div className="rounded-full bg-[#0450CF] w-4 h-4"></div>
          </div>
        </div>
        <button
          className="absolute top-6 right-6 text-lg font-bold"
          onClick={hideModal}
        >
          <img src={close} />
        </button>
        <div className="text-sm md:text-base leading-relaxed p-4 mt-5 text-[#03132F]">
          <p className="font-unbounded font-bold text-2xl">
          Share your complaint with others in LinkedIn
          </p>
          <p>Share your complaint on social networks, the more people see it, the more chances there are for its speedy resolution</p>
        </div>
        <button
          className="lg:h-[56px]  w-full py-2 mt-4 bg-[#001A45] text-white rounded-xl transition duration-150 ease-in-out flex flex-row justify-center items-center gap-2 font-inter text-lg hover:bg-opacity-70 active:bg-black"
          onClick={shareOnLinkedIn}
        >
        <img src={linkedin} />
          Share
        </button>
        <button
          className="lg:h-[56px] w-full py-4 mt-5 bg-white border border-[#001A45] text-[#001A45] rounded-xl transition duration-150 ease-in-out font-inter hover:border-opacity-70 hover:text-opacity-70 active:border-opacity-70 active:text-opacity-70 active:bg-opacity-5"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default LinkedInShareComponent;
