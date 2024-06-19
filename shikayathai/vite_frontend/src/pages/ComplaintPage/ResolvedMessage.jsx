import { useModal } from "../../context/ModalContext.jsx";
import closeIcon from "../../assets/closeIcon.svg";
import api from "../../api/axios.jsx";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";

const ResolvedMessage = (rating) => {
  const { showModal, hideModal } = useModal();
  const [comment, setComment] = useState("");
  const { auth } = useAuth();

  const handleResolvedPayload = async () => {
    const ratingId = rating.id.id;
    const payload = {
      resolution_comment: comment,
      resolution_rating: rating.rating,
      id: ratingId,
      email: auth.email,
    };
    console.log(payload);
    try {
      const apiRes = await api.put(
        `complaints/details/${ratingId}/update-resolution/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${auth?.access}`,
          },
        }
      );
      console.log(apiRes);
      hideModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-row-reverse items-center pb-3">
          <button onClick={hideModal} className="text-lg font-semibold">
            <img src={closeIcon} />
          </button>
        </div>

        {/* Textarea */}
        <div>
          <h1>Express your satisfaction by thanking the brand.</h1>
          <p>Your Thank You Message</p>
          <textarea
            className="w-full p-2 border rounded-lg"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Button */}
        <div>
          <button
            className="w-full hover:bg-[#B5F62B] text-[#001A45] bg-[#A9E922] active:bg-[#C9FF57] font-semibold py-2 px-4 rounded-xl"
            onClick={handleResolvedPayload}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};
export default ResolvedMessage;
