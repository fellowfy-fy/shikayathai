import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../styles/FrameComponent.css";

const FrameComponent = ({ className = "", data }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    if (data?.id) {
      navigate(`/complaints/${data.id}`);
    } else {
      console.log("No complaint ID available for navigation.");
    }
  };

  if (!data?.title) {
    return <div>Loading or no data available...</div>;
  }

  return (
    <div className={`review-card ${className}`}>
      <div className="user-info">
        <img src={data.author_avatar} alt={data.author_name} className="avatar" />
        <div>
          <h4>{data.author_name}</h4>
          <p className="company-name">{data.company_name}</p>
        </div>
      </div>
      <div className="review-text">
        {data.title}
      </div>
      <div className="review-text">
        {data.description}
      </div>
      {data.description && (
        <button className="read-more-button" onClick={handleReadMoreClick}>
          Read more
        </button>
      )}
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author_name: PropTypes.string,
    author_avatar: PropTypes.string,
    company_name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default FrameComponent;
