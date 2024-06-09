import React from 'react';
import './CommentsSection.css';
// import profilePlaceholder from '../../../assets/profilePlaceholder.png';

const Comments = ({ comments }) => {
  return (
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
  );
};

export default Comments;
