import { useModal } from "../../context/ModalContext";
import CopyShare from "../CopyShare/CopyShare";

const FacebookShareComponent = ({ link }) => {
  const { hideModal, showModal } = useModal();


  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
    window.open(url, "_blank");
  };

  const handleSkip = () => {
    showModal(<CopyShare link={link} />)
  }


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        <button className="absolute top-2 right-2 text-lg font-bold" onClick={hideModal}>×</button>
        <div className="text-sm md:text-base leading-relaxed p-4">
            
      <p>
        Your complaint has been submitted successfully! Would you like to share
        it on Facebook?
      </p>
      <p>{link}</p>
        </div>
        <button className="w-full py-2 mt-4 bg-[#B5F62B] text-[#001A45] rounded hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out" onClick={shareOnFacebook}>
            Share
        </button>
        <button className="w-full py-2 mt-4 bg-[#B5F62B] text-[#001A45] rounded hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out" onClick={handleSkip}>
            Skip
        </button>
    </div>
    </div>
  );
};

export default FacebookShareComponent;
