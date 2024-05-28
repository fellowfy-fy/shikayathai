// RecentRequestSection.jsx
import React, { useEffect, useState } from "react";
import FrameComponent from "./FrameComponent";
import "../../styles/RecentRequestSection.css"

const RecentRequestSection = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('https://api.yourdomain.com/requests'); // Adjust the API endpoint as needed
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  return (
    <div className="recent-requests-section">
      <h2>Recent Requests</h2>
      <div className="request-grid">
        {requests.map((request, index) => (
          <FrameComponent key={index} data={request} />
        ))}
      </div>
    </div>
  );
};

export default RecentRequestSection;