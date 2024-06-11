import React from "react";
import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm.jsx';
import man from "../../assets/man.png";
import mansmall from "../../assets/mansmall.png"; 
import './HeroSection.css';

const HeroSection = () => {
  const { showModal } = useModal();

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-title-wrapper">
          <h1 className="hero-title">
            <span>FREE</span>
            <span>Complaint</span>
            <span>Platform</span>
          </h1>
          <p className="hero-subtitle">Turning grievances into wins, guaranteed</p>
          <button className="cta-button" onClick={handleFileComplaintClick}>
            File a complaint
          </button>
        </div>
      </div>
      <img className="hero-graphic" alt="Happy man holding a card" src={man} />
      <img className="hero-graphic-small" alt="Happy man holding a card" src={mansmall} />
    </section>
  );
};

export default HeroSection;
