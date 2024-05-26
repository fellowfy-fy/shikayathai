import React from "react";
import CompanyItem from "./CompanyItem";


const TopRatedCompaniesSection = () => (
    <section className="top-rated-section">
      <h2 className="section-title">Top rated companies</h2>
      <div className="company-list">
        <CompanyItem 
          companyInitials="ST" 
          companyName="SuryaTech" 
          rating="4.5" 
          reviews="150"
        />
        {/* Add more CompanyItem components as needed */}
      </div>
    </section>
  );

  export default TopRatedCompaniesSection
  
  