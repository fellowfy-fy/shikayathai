import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm';

const InfoComponent = () => {
    const { hideModal, showModal } = useModal();

    const handleOk = () => {
        hideModal();
        showModal(<FileComplaintForm />)
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                <button className="absolute top-2 right-2 text-lg font-bold" onClick={hideModal}>×</button>
                <div className="text-sm md:text-base leading-relaxed p-4">
                    <p>When you post your complaint for everyone to see, companies notice and try to fix the problem faster. This also lets other customers know what's going on, which can help get things solved quicker. Talking about your problem openly can lead to help from others who had the same issue and found a way to fix it.</p>
                    <p className="mt-4">But, it's important to keep your personal info private when you share your complaint. This way, you stay safe while working together to make sure companies listen and make things right.</p>
                </div>
                <button className="w-full py-2 mt-4 bg-[#B5F62B] text-[#001A45] rounded hover:bg-[#A9E922] active:bg-[#C9FF57] transition duration-150 ease-in-out" onClick={handleOk}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default InfoComponent;
