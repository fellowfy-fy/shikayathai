import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.jsx";
import SuccessBanner from "./SuccBanner/SuccessBanner.jsx";
import Comments from "./CommentSection/Comments.jsx";
import profilePlaceholder from "../../assets/profilePlaceholder.png";
import imagePlaceholder from "../../assets/imagePlaceholder.jpg";
import share from "../../assets/share.svg";
import support from "../../assets/support.svg";
import resolved from "../../assets/resolved.svg";
import arrow from "../../assets/arrow.svg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -154, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 154, behavior: "smooth" });
  };


  useEffect(() => {
    api
      .get(`complaints/details/${id}`)
      .then((response) => {
        setComplaint(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaint:", error);
      });
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  const mainImage =
    complaint.photos && complaint.photos.length > 0
      ? complaint.photos[0].image
      : imagePlaceholder;
  const thumbnails =
    complaint.photos && complaint.photos.length > 1
      ? complaint.photos.slice(1)
      : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mx-auto">
      <SuccessBanner id={id} />
      <div className="flex items-center my-6">
        <img
          src={
            complaint.author_userpic
              ? `http://localhost:8000${complaint.author_userpic}`
              : profilePlaceholder
          }
          alt="User avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="text-lg font-bold text-[#001A45]">
            {complaint.author_name}
          </h4>
          <p className="text-sm text-gray-600">{complaint.company_name}</p>
        </div>
      </div>
      <h1 className="text-5xl font-bold text-[#001A45] pl-3 whitespace-pre-wrap break-all">
        {complaint.title}
      </h1>
      <div className="flex gap-6 items-start">
        <div className="flex flex-col items-start mt-5">
          <Zoom>
            <img
              src={mainImage || imagePlaceholder}
              alt="Main"
              className="w-[640px] h-[640px] object-cover rounded-[32px]"
            />
          </Zoom>
          
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 p-2 rounded-[16px] shadow-md z-10 rotate-180 w-[40px] h-[40px]
"
            >
              <img src={arrow} />
            </button>
          <div className="flex overflow-x-auto space-x-4 w-[640px] mt-[24px]" ref={scrollContainerRef} style={{ scrollBehavior: "smooth" }}>
            {thumbnails.map((photo, index) => (
              <span key={index}>
              <Zoom >
              <span className="flex w-[154px] h-[154px]">
                <img
                  src={photo.image || imagePlaceholder}
                  alt={`Thumbnail ${index}`}
                  className="w-[154px] h-[154px] object-cover rounded-[32px] shrink-0"
                />

                </span>
              </Zoom></span>
            ))}
          </div>
          
          <button
              onClick={scrollRight}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 p-2 rounded-[16px] shadow-md w-[40px] h-[40px]"
            >
              <img src={arrow} />
            </button>
        </div>
        </div>
        <div className="flex-1">
          <p className="mb-4 mt-4 text-gray-800 whitespace-pre-wrap break-all">
            {complaint.description}
          </p>
          <div className="mt-4 text-blue-500">
            {complaint.documents &&
              complaint.documents.map((doc, index) => (
                <div key={index} className="mt-4">
                  <a href={doc.file} target="_blank" rel="noopener noreferrer">
                    {decodeURIComponent(doc.file.split("/").pop())}
                  </a>
                </div>
              ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Posted on {new Date(complaint.created_at).toLocaleDateString()}
          </p>
          <div className="flex justify-start gap-2.5 mt-4">
            <button className="bg-gray-200 text-[#001A45] py-2.5 px-5 rounded text-sm flex items-center gap-2">
              <img src={support} alt="Support" className="w-4 h-4" /> Support
            </button>
            <button className="bg-gray-200 text-[#001A45] py-2.5 px-5 rounded text-sm flex items-center gap-2">
              <img src={share} alt="Share" className="w-4 h-4" /> Share
            </button>
            <button className="bg-gray-200 text-[#001A45] py-2.5 px-5 rounded text-sm flex items-center gap-2">
              <img src={resolved} alt="Mark as resolved" className="w-4 h-4" />{" "}
              Mark as resolved
            </button>
          </div>
        </div>
      </div>
      <Comments initialComments={complaint.comments} />
    </div>
  );
};

export default ComplaintDetail;
