import React from "react";
import { FREE_COMPLAINT_PLATFORM, FILE_A_COMPLAINT } from "../../constants";
import man from "../../assets/man.jpg"; 
import '../../styles/HeroSection.css';

const HeroSection = ({ onFileComplaintClick }) => (
  <section className="hero-section">
    <div className="hero-content">
      <div className="hero-title-wrapper">
        <h1 className="hero-title">FREE complaint platform</h1>
        <p className="hero-subtitle">Turning grievances into wins, guaranteed</p>
        <button className="cta-button" onClick={onFileComplaintClick}>
          File a complaint
        </button>
      </div>
    </div>
    <img className="hero-graphic" alt="Happy man holding a card" src={man} />
  </section>
);

export default HeroSection;





