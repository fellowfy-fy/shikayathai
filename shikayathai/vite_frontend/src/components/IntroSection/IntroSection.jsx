import React from "react";
import { BRAND_NAME } from "../../constants";

const IntroSection = () => (
  <section className="intro-section">
    <div className="intro-content">
      <h1 className="intro-title">Welcome to {BRAND_NAME}!</h1>
      <p className="intro-text">
        Here, we make sure your complaints get heard and fixed, fast. File
        Your Complaint Easily:
      </p>
      <div className="intro-steps">
        <div className="intro-step">
          <span className="intro-step-number">1</span>
          <div className="intro-step-detail">
            <h3 className="step-header">Describe Your Issue:</h3>
            <p>Let us know what went wrong.</p>
          </div>
        </div>
        <div className="intro-step">
          <span className="intro-step-number">2</span>
          <div className="intro-step-detail">
            <h3 className="step-header">Submit:</h3>
            <p>We handle the details, contacting the company and making your case public.</p>
          </div>
        </div>
        <div className="intro-step">
          <span className="intro-step-number">3</span>
          <div className="intro-step-detail">
            <h3 className="step-header">See Results:</h3>
            <p>Track your complaint's journey to resolution.</p>
          </div>
        </div>
        <div className="goal">
            <p>Our platform aims to foster constructive dialogues between consumers and companies, leading to mutually beneficial resolutions.
</p>
        </div>
      </div>
    </div>
  </section>
);

export default IntroSection;
