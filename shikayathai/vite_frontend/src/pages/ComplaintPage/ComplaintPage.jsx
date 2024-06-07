import{ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axios.jsx';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    api.get(`/api/complaints/${id}/`)
      .then(response => {
        setComplaint(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaint:', error);
      });
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complaint-page">
    <div className="breadcrumbs">
    <a href="/">Home</a> &gt; <a href="/my-complaints">My complaints</a> &gt; <span>Complaint {id}</span>
  </div>
  <div className="notification-banner">
    Your complaint is added successfully! We will process it asap.
    <br />
    Make your complaint more effective. The more people will see it the higher chances that company will resolve it quickly. Share it on social media!
    <br />
    <input type="text" value={`shareyourlink.com/${id}`} readOnly />
  </div>
  <div className="complaint-details">
    <div className="user-info">
      {/* <img src={complaint.userAvatar} alt="User avatar" /> */}
    <div>
      <h4>{complaint.author}</h4>
      <p>{complaint.company_name}</p>
      </div>
        </div>
        <h1>{complaint.title}</h1>
        <p>{complaint.description}</p>
        <div className="attachment">
          <a href={complaint.attachment}>{complaint.attachmentName}</a>
        </div>
        <div className="timestamp">Posted on {complaint.timestamp}</div>
        <div className="action-buttons">
          <button>Support</button>
          <button>Share</button>
          <button>Mark as resolved</button>
        </div>
        <div className="image-gallery">
          {/* <img src={complaint.images[0]} alt="Main" className="main-image" /> */}
          {/* <div className="thumbnails">
            {complaint.images.map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index}`} />
            ))}
          </div> */}
        </div>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        {/* {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="commenter-info">
              <img src={comment.avatar} alt="Commenter avatar" />
              <div>
                <h4>{comment.author}</h4>
                <p>{comment.timestamp}</p>
              </div>
            </div>
            <p>{comment.text}</p>
          </div>
        ))} */}
        <div className="add-comment">
          {/* <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          ></textarea> */}
          {/* <button onClick={handleCommentSubmit}>Add comment</button> */}
        </div>
      </div>
    </div>
      
  );
};

export default ComplaintDetail;
