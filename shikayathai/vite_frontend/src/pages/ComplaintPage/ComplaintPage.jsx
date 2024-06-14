import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.jsx";
import SuccessBanner from "./SuccBanner/SuccessBanner.jsx";
import Comments from "./CommentSection/Comments.jsx";
import "./ComplaintSection.css";
import profilePlaceholder from "../../assets/profilePlaceholder.png";
import imagePlaceholder from "../../assets/imagePlaceholder.jpg";
import share from "../../assets/share.svg";
import support from "../../assets/support.svg";
import resolved from "../../assets/resolved.svg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

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
    <div className="complaint-page">
      <SuccessBanner id={id} />
      <div className="user-info">
        <img
          src={
            `http://localhost:8000${complaint.author_userpic}` ||
            profilePlaceholder
          }
          alt="User avatar"
          className="user-avatar"
        />
        <div className="user-details">
          <h4 className="user-name">{complaint.author_name}</h4>
          <p className="user-company">{complaint.company_name}</p>
        </div>
      </div>
      <h1 className="complaint-title">{complaint.title}</h1>
      <div className="complaint-content">
        <div className="image-gallery">
          <Zoom key={1}>
            <img src={mainImage} alt="Main" className="main-image" />
          </Zoom>
          <div className="thumbnails">
            {thumbnails.map((photo, index) => (
              <Zoom key={index}>
                <img
                  src={photo.image || imagePlaceholder}
                  alt={`Thumbnail ${index}`}
                  className="thumbnail-image"
                />
              </Zoom>
            ))}
          </div>
        </div>
        <div className="complaint-details">
          <p className="complaint-description">{complaint.description}</p>
          <div className="attachments">
            {complaint.documents &&
              complaint.documents.map((doc, index) => (
                <div className="attachment" key={index}>
                  <a href={doc.file} target="_blank" rel="noopener noreferrer">
                    {decodeURIComponent(doc.file.split("/").pop())}
                  </a>
                </div>
              ))}
          </div>
          <div className="timestamp">
            Posted on {new Date(complaint.created_at).toLocaleDateString()}
          </div>
          <div className="action-buttons">
            <button className="support-button">
              <img src={support} alt="Support" />
              Support
            </button>
            <button className="share-button">
              <img src={share} alt="Share" />
              Share
            </button>
            <button className="resolved-button">
              <img src={resolved} alt="Mark as resolved" />
              Mark as resolved
            </button>
          </div>
        </div>
      </div>
      <Comments comments={complaint.comments} />
    </div>
  );
};

export default ComplaintDetail;
