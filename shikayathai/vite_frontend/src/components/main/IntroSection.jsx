import React from "react";
import { BRAND_NAME } from "../../constants";


const IntroSection = () => (
    <section className="intro-section">
      <div className="intro-content">
        <div className="intro-title-wrapper">
          <b className="intro-title">Welcome to {BRAND_NAME}!</b>
        </div>
        <div className="intro-text">
          Here, we make sure your complaints get heard and fixed, fast. File
          Your Complaint Easily:
        </div>
      </div>
      <button className="cta-button" onClick={onFileComplaintClick}>
        {DESCRIBE_YOUR_ISSUE}
      </button>
    </section>
  );

export default IntroSection