import React from "react";


const OrganizationSection = () => (
    <section className="organization-section">
      <div className="section-background" />
      <div className="section-header">
        <div className="section-title-wrapper">
          <b className="section-title">Create Your Organization's Page Today!</b>
        </div>
        <div className="section-subtitle">
          Empower your business by creating a page on our platform. Here's
          why:
        </div>
      </div>
      <button onClick={() => alert('Create your organization page!')}>Create</button>
    </section>
  );
  
  export default OrganizationSection