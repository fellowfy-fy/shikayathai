import './Comments.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import api from '../../../api/axios';
// import profilePlaceholder from '../../../assets/profilePlaceholder.png';

const Comments = ({ comments }) => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      'user': auth?.name,
      'complaint': id,
      'text': newComment,
    }
    try {
      const apiResponse = await api.post("complaints/comments/create/", payload, {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      })
      console.log(apiResponse)
      setNewComment("")
    } catch(err) {
      console.log(err)
    }
    return
  }

  return (
    <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((comment) => (
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
        ))}
        <div className="add-comment">
        {auth.access ?
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
          ></textarea>
          : <div></div>}{auth.access ?
           <button onClick={handleCommentSubmit}>Add comment</button> :
           <button>Login to comment</button>}
        </div>
      </div>
  );
};

export default Comments;
