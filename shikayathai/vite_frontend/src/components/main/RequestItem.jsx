import React from "react";

const RequestItem = ({ userInitials, userName, companyName, complaintText }) => (
    <div className="request-item">
      <div className="user-info">
        <div className="user-photo">{userInitials}</div>
        <div className="user-details">
          <div className="user-name">{userName}</div>
          <div className="user-company">{companyName}</div>
        </div>
      </div>
      <div className="request-text">{complaintText}</div>
      <button onClick={() => alert("Read more about this complaint!")}>Read More</button>
    </div>
  );

  export default RequestItem