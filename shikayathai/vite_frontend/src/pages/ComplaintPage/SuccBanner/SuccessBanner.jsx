import React from 'react';
import facebookIcon from '../../../assets/ico-fb.svg'; 
import googleIcon from '../../../assets/ico-g.svg'; 
import linkedinIcon from '../../../assets/ico-li.svg'; 
import copyIcon from '../../../assets/ico-copy.svg'; 
import './SuccessBanner.css';

const SuccessBanner = ({ id }) => {
  return (
    <div className="success-banner">
      <p className="success-text">
        Your complaint is added successfully! We will process it ASAP.
      </p>
      <p className="success-subtext">
        Make your complaint more effective. The more people will see it the higher chances that company will resolve it quickly. Share it on social media!
      </p>
      <div className="social-media-buttons">
        <button className="social-button facebook">
          <img src={facebookIcon} alt="Facebook" />
        </button>
        <button className="social-button google">
          <img src={googleIcon} alt="Google" />
        </button>
        <button className="social-button linkedin">
          <img src={linkedinIcon} alt="LinkedIn" />
        </button>
        <div className="link-container">
          <input type="text" value={`shareyourlink.com/${id}`} readOnly className="share-link" />
          <button className="copy-button" onClick={() => navigator.clipboard.writeText(`shareyourlink.com/${id}`)}>
            <img src={copyIcon} alt="Copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessBanner;
