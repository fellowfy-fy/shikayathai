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
            <div className="intro-step-detail">Describe Your Issue: Let us know what went wrong.</div>
          </div>
          <div className="intro-step">
            <span className="intro-step-number">2</span>
            <div className="intro-step-detail">Submit: We handle the details, contacting the company and making your case public.</div>
          </div>
          <div className="intro-step">
            <span className="intro-step-number">3</span>
            <div className="intro-step-detail">See Results: Track your complaint's journey to resolution.</div>
          </div>
        </div>
      </div>
    </section>
);

export default IntroSection;
