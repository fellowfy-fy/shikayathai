import React from "react";
import { useModal } from '../../context/ModalContext';
import FileComplaintForm from '../FileComplaintForm/FileComplaintForm';
import './StatisticsSection.css';
import logo from '../../assets/invlogo.svg'; // Adjust the path to your logo image

const StatisticSection = () => {
  const { showModal } = useModal();

  const handleFileComplaintClick = () => {
    showModal(<FileComplaintForm />);
  };

  return (
    <section className="statistic-section">
      <div className="statistic-section-logo">
        <img src={logo} alt="Shikayathai Logo" />
        <h2>Shikayathai</h2>
      </div>
      <h3>in numbers</h3>
      <div className="statistic-items">
        <div className="statistic-item">
          <h3>1 500 000+</h3>
          <p>active users</p>
        </div>
        <div className="statistic-item">
          <h3>32 000+</h3>
          <p>active companies</p>
        </div>
        <div className="statistic-item">
          <h3>8 000 000+</h3>
          <p>resolved requests</p>
        </div>
      </div>
      <button onClick={handleFileComplaintClick} className="file-complaint-button">File a complaint</button>
    </section>
  );
};

export default StatisticSection;
