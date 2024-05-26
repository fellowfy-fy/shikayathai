import React from "react";
import PropTypes from "prop-types";
import "./FrameComponent1.css";

const FrameComponent1 = ({ className = "", title }) => {
  return (
    <div className={`frame ${className}`}>
      <div className="title-wrapper">
        <h2 className="title">{title}</h2>
      </div>
      <div className="watch-all-container">
        <div className="watch-all-text">Watch all</div>
        <img
          className="arrow-icon"
          alt="Arrow Up"
          src="/iconamoonarrowup2light.svg"
        />
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default FrameComponent1;