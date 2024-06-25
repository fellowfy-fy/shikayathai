import { useModal } from "../../context/ModalContext.jsx";
import closeIcon from "../../assets/closeIcon.svg";
import star from "../../assets/star.svg";
import ResolvedMessage from "./ResolvedMessage.jsx";
import { useState } from "react";

const ResolvedRating = (id, { company_name }) => {
  const { hideModal, showModal } = useModal();
  const [rating, setRating] = useState(0);
  const company = company_name;
  console.log("Hello");
  console.log(company_name);
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleNext = () => {
    showModal(<ResolvedMessage rating={rating} id={id} />);
  };
  const renderStars = () => {
    return [20, 40, 60, 80, 100].map((starValue) => (
      <button key={starValue} onClick={() => handleRatingClick(starValue)}>
        <img
          src={star}
          className={`w-10 h-10 rounded-md flex items-center justify-center ${
            rating >= starValue ? "bg-[#C9FF57]" : "bg-[#001A45] bg-opacity-5"
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 shadow-xl w-[800px] rounded-[32px] mx-6">
        <div className="flex flex-row-reverse items-center pb-3">
          <button onClick={hideModal} className="text-lg font-semibold">
            <img src={closeIcon} />
          </button>
        </div>

        {/* Rating */}
        <div>
          <h1 className="font-inter font-semibold text-2xl mb-5">
            Are you satisfied with the result of your {company} brand complaint?
          </h1>
          <div className="font-inter font-medium text-lg mb-5">
            <p>1 Star: I am not happy at all</p>
            <p>5 Star: I am very pleased</p>
          </div>
          <div className="flex flex-row gap-1 mb-5">{renderStars()}</div>
        </div>

        {/* Button */}
        <div>
          <button
            className="w-full hover:bg-[#B5F62B] text-[#001A45] bg-[#A9E922] active:bg-[#C9FF57] font-semibold py-2 px-4 rounded-xl"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolvedRating;
