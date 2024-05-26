import React from "react";

const CompanyItem = ({ companyInitials, companyName, rating, reviews }) => (
    <div className="company-item">
      <div className="company-info">
        <div className="company-initials-wrapper">
          <b className="company-initials">{companyInitials}</b>
        </div>
        <b className="company-name">{companyName}</b>
      </div>
      <div className="company-rating">
        <div className="rating-value">{rating}</div>
        <div className="reviews-count">{reviews} reviews</div>
      </div>
    </div>
  );
  
  export default CompanyItem