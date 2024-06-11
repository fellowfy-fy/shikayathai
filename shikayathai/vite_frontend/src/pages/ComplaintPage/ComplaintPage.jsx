import{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios.jsx';
import SuccessBanner from './SuccBanner/SuccessBanner.jsx';
// import Comments from './CommentSection/Comments.jsx'; 
import './ComplaintSection.css';
import profilePlaceholder from '../../assets/profilePlaceholder.png';
import imagePlaceholder from '../../assets/imagePlaceholder.jpg';
import share from '../../assets/share.svg'; 
import support from '../../assets/support.svg';
import resolved from '../../assets/resolved.svg'

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    api.get(`complaints/details/${id}`)
      .then(response => {
        setComplaint(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaint:');
      });
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  const mainImage = complaint.images && complaint.images.length > 0 ? complaint.images[0] : imagePlaceholder;
  const thumbnails = complaint.images && complaint.images.length > 1 ? complaint.images.slice(1) : [imagePlaceholder, imagePlaceholder, imagePlaceholder, imagePlaceholder];

  return (
    <div className="complaint-page">
    <SuccessBanner id={id} />
    <div className="user-info">
      <img 
        src={complaint.userAvatar || profilePlaceholder} 
        alt="User avatar" 
        className="user-avatar" 
      />
      <div className="user-details">
        <h4 className="user-name">{complaint.author}</h4>
        <p className="user-company">{complaint.company_name}</p>
      </div>
    </div>
    <h1 className="complaint-title">{complaint.title}</h1>
    <div className="complaint-content">
      <div className="image-gallery">
        <img src={mainImage} alt="Main" className="main-image" />
        <div className="thumbnails">
          {thumbnails.map((image, index) => (
            <img key={index} src={image} alt={`Thumbnail ${index}`} className="thumbnail-image" />
          ))}
        </div>
      </div>
      <div className="complaint-details">
        <p className="complaint-description">{complaint.description}</p>
        <div className="attachment">
          <a href={complaint.attachment}>{complaint.attachmentName}</a>
        </div>
        <div className="timestamp">Posted on {complaint.timestamp}</div>
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
    {/* <Comments comments={complaint.comments} /> */}
  </div>      
  );
};

export default ComplaintDetail;
