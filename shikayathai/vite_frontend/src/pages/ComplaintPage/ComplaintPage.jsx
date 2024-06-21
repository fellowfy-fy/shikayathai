import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios.jsx";
import SuccessBanner from "./SuccBanner/SuccessBanner.jsx";
import Comments from "./CommentSection/Comments.jsx";
import profilePlaceholder from "../../assets/profilePlaceholder.png";
import imagePlaceholder from "../../assets/imagePlaceholder.jpg";
import share from "../../assets/share.svg";
import support from "../../assets/support.svg";
import resolved from "../../assets/resolved.svg";
import arrow from "../../assets/arrow.svg";
import document from "../../assets/document.svg";
import timestamparrow from "../../assets/timestamparrow.svg";
import smile from "../../assets/smile.svg";
import star from "../../assets/star.svg";
import Zoom from "react-medium-image-zoom";
import { useModal } from "../../context/ModalContext.jsx";
import ResolvedRating from "./ResolvedRating.jsx";
import useAuth from "../../hooks/useAuth.js";
import "react-medium-image-zoom/dist/styles.css";
import navigationArrow from "../../assets/navigationArrow.svg";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const ComplaintDetail = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const { showModal } = useModal();
  const [thumbnails, setThumbnails] = useState([]);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -154, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 154, behavior: "smooth" });
  };

  const handleResolved = () => {
    showModal(<ResolvedRating id={complaint.id} />);
  };

  const renderStars = () => {
    const rating = complaint.resolution_rating;
    return [20, 40, 60, 80, 100].map((starValue) => (
      <img
        key={starValue}
        src={star}
        className={`w-10 h-10 rounded-md flex items-center justify-center ${
          rating >= starValue ? "bg-[#C9FF57]" : "bg-[#001A45] bg-opacity-5"
        }`}
      />
    ));
  };

  useEffect(() => {
    api
      .get(`complaints/details/${id}`)
      .then((response) => {
        setComplaint(response.data);
        response.data.photos && response.data.photos.length > 0
          ? setThumbnails(response.data.photos)
          : setThumbnails([]);
      })
      .catch((error) => {
        console.error("Error fetching complaint:", error);
      });
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-6 bg-white rounded-lg mx-auto md:ml-[120px] md:mr-[120px]">
        <div className="flex flex-row gap-2 mb-10">
          <Link to="/" className="text-[#001A45] hover:underline">
            Home
          </Link>
          <img src={navigationArrow} />
          <Link to="/complaints" className="text-[#001A45] hover:underline">
            All complaints
          </Link>
          <img src={navigationArrow} />
          <span className="font-bold">Complaint {id}</span>
        </div>
        <SuccessBanner id={id} />
        <div className="flex items-center my-6 mb-6">
          <img
            src={
              complaint.author_userpic
                ? complaint.author_userpic
                : profilePlaceholder
            }
            alt="User avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h4 className="text-lg font-bold text-[#001A45]">
              {complaint.author_name}
            </h4>
            <div className="grid grid-cols-6">
              <div className="w-5 h-5 rounded-full bg-purple-200 text-white text-xs font-bold flex justify-center mr-2 col-span-1">
                {complaint.company_name.charAt(0)}
              </div>
              <p className="text-sm text-gray-600 col-span-5">
                {complaint.company_name}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#001A45] pl-3 whitespace-pre-wrap break-all mb-6">
          {complaint.title}
        </h1>
        <div className="flex gap-6 lg:flex-row flex-col items-start">
          {thumbnails && thumbnails.length > 0 ? (
            <div className="flex flex-col items-start mt-5">
              <Zoom>
                <img
                  src={thumbnails[0].image}
                  alt="Main"
                  className="w-[640px] h-[640px] object-cover rounded-[32px] lg:block hidden"
                />
              </Zoom>

              <div className="relative">
                <button
                  onClick={scrollLeft}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 p-2 rounded-[16px] shadow-md z-10 rotate-180 w-[40px] h-[40px] hidden lg:block"
                >
                  <img src={arrow} />
                </button>
                <div
                  className="flex overflow-x-auto space-x-4 lg:w-[640px] lg:h-auto w-[312px] h-[312px] mt-[24px]"
                  ref={scrollContainerRef}
                  style={{ scrollBehavior: "smooth" }}
                >
                  {thumbnails.map((photo, index) => (
                    <span key={index}>
                      <Zoom>
                        <span className="flex w-[312px] h-[312px] sm:w-[154px] sm:h-[154px]">
                          <img
                            src={photo.image || imagePlaceholder}
                            alt={`Thumbnail ${index}`}
                            className="w-[312px] h-[312px] sm:w-[154px] sm:h-[154px] object-cover rounded-[32px] shrink-0"
                          />
                        </span>
                      </Zoom>
                    </span>
                  ))}
                </div>

                <button
                  onClick={scrollRight}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 p-2 rounded-[16px] shadow-md w-[40px] h-[40px] hidden lg:block"
                >
                  <img src={arrow} />
                </button>
              </div>
            </div>
          ) : (
            <span></span>
          )}
          <div className="flex-1">
            {complaint.resolution_rating ? (
              <div className="bg-[#EAFFEA] rounded-2xl p-2">
                <div className="px-2">
                  <img src={smile} />
                </div>
                <div className="flex flex-row gap-2 p-2">{renderStars()}</div>
                <div className="px-2">{complaint.resolution_comment}</div>
              </div>
            ) : (
              <></>
            )}
            <p className="mb-4 mt-4 text-gray-800 whitespace-pre-wrap break-all md:max-w-[640px]">
              {complaint.description}
            </p>
            <div className="mt-4 text-[#001A45]">
              {complaint.documents &&
                complaint.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="mt-4 flex flex-row rounded-xl border border-[#001A45] border-opacity-30 lg:w-fit w-full p-2 font-inter font-medium"
                  >
                    <img src={document} className="mr-2" />
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {decodeURIComponent(doc.file.split("/").pop())}
                    </a>
                  </div>
                ))}
            </div>
            <p className="text-sm text-gray-600 mt-4 mb-4">
              <img src={timestamparrow} className="inline pr-1" />
              Posted on{" "}
              {new Date(complaint.created_at).toLocaleDateString(
                "en-us",
                options
              )}
            </p>
            <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-wrap justify-between">
              <button className="bg-transparent text-[#001A45] py-2.5 px-5 rounded-lg text-sm flex items-center justify-center gap-2 lg:col-span-1 border border-[#001A45] border-opacity-70 basis-[47%]">
                <img src={support} alt="Support" className="w-4 h-4" /> Support
              </button>
              <button className="bg-transparent text-[#001A45] py-2.5 px-5 rounded-lg text-sm flex items-center justify-center gap-2 lg:col-span-1 border border-[#001A45] border-opacity-70 basis-[47%]">
                <img src={share} alt="Share" className="w-4 h-4" /> Share
              </button>
              {auth.name === complaint.author_name &&
              !complaint.resolution_rating ? (
                <button
                  className="bg-[#B5F62B] bg-opacity-30 text-[#001A45] py-2.5 px-5 rounded-lg text-sm flex items-center justify-center gap-2 lg:col-span-1 border border-[#001A45] border-opacity-70 w-full"
                  onClick={handleResolved}
                >
                  <img
                    src={resolved}
                    alt="Mark as resolved"
                    className="w-4 h-4"
                  />{" "}
                  Mark as resolved
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <Comments initialComments={complaint.comments} />
    </div>
  );
};

export default ComplaintDetail;
