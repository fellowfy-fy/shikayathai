import { useNavigate } from "react-router-dom";

const ComplaintComponent = ({ complaint }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    if (complaint?.id) {
      navigate(`/complaints/${complaint.id}`);
    } else {
      console.log("No complaint ID available for navigation.");
    }
  };

  return (
    <div className="bg-[#001A450D] bg-opacity-5 rounded-2xl p-4 w-[312px] my-2 h-[280px] relative">
      {/* Complaint Userpic, Username and Company*/}
      <div className="grid grid-cols-6 mb-3">
        <div className="flex flex-row mb-2 col-span-1">
          <img
            src={complaint.author_userpic}
            className="w-11 h-11 rounded-full mr-4"
          />
        </div>
        <div className="col-span-5">
          <div className="truncate">{complaint.author_name}</div>
          <div className="flex flex-row">
            <div className="w-6 h-6 rounded-full bg-purple-200 text-white text-xl font-bold flex items-center justify-center mr-2 shrink-0">
              {complaint.company_name.charAt(0)}
            </div>
            <div>{complaint.company_name}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="break-words mb-3">
        {complaint.description.substring(0, 160)}...
      </div>

      {/* Button More */}
      <div className="absolute left-4 bottom-4 text-[#0450CF]">
        <button className="hover:underline" onClick={handleReadMoreClick}>
          More
        </button>
      </div>
    </div>
  );
};

export default ComplaintComponent;
