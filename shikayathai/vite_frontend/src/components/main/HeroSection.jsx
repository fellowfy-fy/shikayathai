import React from "react";
import { FREE_COMPLAINT_PLATFORM, FILE_A_COMPLAINT } from "../../constants";

const HeroSection = ({ onFileComplaintClick }) => (
    <section className="hero-section">
      <div className="hero-image" />
      <img className="hero-graphic" alt="Graphic" src="/aeroshkin-indian-guy-holding-a-receipt-is-very-happy-bacuse-he-ab2fe742-1-1@2x.png" />
      <div className="hero-title-wrapper">
        <b className="hero-title">{FREE_COMPLAINT_PLATFORM}</b>
      </div>
      <button className="cta-button" onClick={onFileComplaintClick}>
        {FILE_A_COMPLAINT}
      </button>
      <div className="hero-subtitle">
        Turning grievances into wins, guaranteed
      </div>
    </section>
  );

export default HeroSection;
