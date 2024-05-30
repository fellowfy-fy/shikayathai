import React from "react";
import { BRAND_NAME } from "../../constants";


const StatisticsSection = () => (
    <section className="statistics-section">
      <div className="section-header">
        <div className="section-logo">
          <img className="logo-icon" alt="" src="/frame-71.svg" />
          <b className="brand-name">{BRAND_NAME}</b>
        </div>
        <div className="section-title-wrapper">
          <b className="section-title">in numbers</b>
        </div>
      </div>
      <div className="statistics-content">
        <div className="statistics-list">
          <div className="statistic-item">
            <b className="statistic-value">1 500 000+</b>
            <b className="statistic-label">active users</b>
          </div>
        </div>
        <button className="cta-button" onClick={() => alert('Statistical data clicked!')}>
          More Statistics
        </button>
      </div>
    </section>
  );
  

  export default StatisticsSection