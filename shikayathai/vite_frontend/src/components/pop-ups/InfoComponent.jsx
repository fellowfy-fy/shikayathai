import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm';
import arrow from "../../assets/arrow.svg"
import close from "../../assets/close.svg";

const InfoComponent = () => {
    const { hideModal, showModal } = useModal();

    const handleOk = () => {
        hideModal();
        showModal(<FileComplaintForm />)
    };


return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-[32px] max-w-[800px] h-[423px] w-full relative">
        <button className="absolute top-6 right-7 text-lg font-bold" onClick={hideModal}><img src={close} /></button>
        <button className="absolute top-6 left-7 text-lg font-bold rotate-180" onClick={handleOk}><img src={arrow}/></button>
        <div className="text-[23px] mt-[36px] font-inter leading-relaxed">
            <p>When you post your complaint for everyone to see, companies notice and try to fix the problem faster. This also lets other customers know what's going on, which can help get things solved quicker. Talking about your problem openly can lead to help from others who had the same issue and found a way to fix it.</p>
            <p className="">But, it's important to keep your personal info private when you share your complaint. This way, you stay safe while working together to make sure companies listen and make things right.</p>
        </div>
        <button className="w-full h-[55px] bg-[#B5F62B] text-[#001A45] rounded-[12px] hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out font-medium text-[18px] " onClick={handleOk}>
            Ok
        </button>
      </div>
    </div>
  );
}; 

export default InfoComponent;

