import React from "react";
import RequestItem from "./RequestItem";

const RecentRequestsSection = ({ title }) => (
    <section className="recent-requests-section">
      <h2 className="section-title">{title}</h2>
      <div className="request-list">
        <RequestItem 
          userInitials="An" 
          userName="Anjali" 
          companyName="SuryaTech" 
          complaintText="sampletext"
        />
      </div>
      <div className="pagination-buttons">
        <button onClick={() => alert("Previous page")}>Previous</button>
        <button onClick={() => alert("Next page")}>Next</button>
      </div>
    </section>
  );

  export default RecentRequestsSection