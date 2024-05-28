import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/FrameComponent.css";
import "../../styles/Modal.css"

// Simple modal component
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>Close</button>
        <p>{content}</p>
      </div>
    </div>
  );
};

const FrameComponent = ({ className = "", data }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleReadMoreClick = () => {
    // Only open modal if fullText is available
    if (data?.fullText) {
      setModalOpen(true);
    } else {
      console.log("No full text available for modal.");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Check if data and data.text are available before rendering
  if (!data?.text) {
    return <div>Loading or no data available...</div>;
  }

  return (
    <div className={`review-card ${className}`}>
      <div className="user-info">
        {/* User info goes here */}
      </div>
      <div className="review-text">
        {data.text}
      </div>
      <button className="read-more-button" onClick={handleReadMoreClick}>
        Read more
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} content={data.fullText} />
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    text: PropTypes.string,
    fullText: PropTypes.string // Ensure this prop is available
  })
};

export default FrameComponent;