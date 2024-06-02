import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ComplaintPage.css";

const ComplaintPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch the complaint details
    axios.get(`/api/complaints/${id}`)
      .then(response => setComplaint(response.data))
      .catch(error => console.error("Error fetching complaint:", error));
    
    // Fetch the comments
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    axios.get(`/api/complaints/${id}/comments`)
      .then(response => {
        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          setComments([]);
        }
      })
      .catch(error => console.error("Error fetching comments:", error));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      axios.post(`/api/complaints/${id}/comments`, { content: newComment })
        .then(response => {
          setNewComment("");
          fetchComments();
        })
        .catch(error => console.error("Error posting comment:", error));
    }
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complaint-page">
      <div className="complaint-header">
        <h2>{complaint.title}</h2>
        <div className="user-info">
          <img src={complaint.author_avatar} alt={complaint.author_name} className="avatar" />
          <div>
            <h4>{complaint.author_name}</h4>
            <p className="company-name">{complaint.company_name}</p>
          </div>
        </div>
        <p>{complaint.description}</p>
        {complaint.images && (
          <div className="complaint-images">
            {complaint.images.map((image, index) => (
              <img key={index} src={image} alt={`Complaint image ${index + 1}`} />
            ))}
          </div>
        )}
        <div className="complaint-actions">
          <button>Support</button>
          <button>Share</button>
          <button>Mark as resolved</button>
        </div>
      </div>
      <div className="complaint-comments">
        <h3>Comments</h3>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h4>{comment.author}</h4>
            <p>{comment.date}</p>
            <p>{comment.content}</p>
          </div>
        ))}
        <div className="new-comment">
          <textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleAddComment}>Add comment</button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
