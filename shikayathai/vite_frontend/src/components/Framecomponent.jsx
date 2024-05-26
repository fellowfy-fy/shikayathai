import React from "react";
import PropTypes from "prop-types";
import "./FrameComponent.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={`review-card ${className}`}>
      <div className="user-info">
        <div className="user-photo">
          <div className="user-initials">An</div>
        </div>
        <div className="user-details">
          <div className="user-name">Anjali</div>
          <div className="user-company">
            <div className="company-initials-wrapper">
              <div className="company-initials">St</div>
            </div>
            <div className="company-name">SuryaTech</div>
          </div>
        </div>
      </div>
      <div className="review-text">
        sampletext
      </div>
      <div className="read-more-button">
        <div className="read-more-text">read more</div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;