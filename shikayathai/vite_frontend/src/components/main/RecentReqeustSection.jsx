// RecentRequestSection.jsx
import React, { useEffect, useState } from "react";
import FrameComponent from "./FrameComponent";
import api from "../../api/axios"

function RecentRequestSection(){
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const url = "/api/complaints/get/"
      const data = await api.get(url);
      setRequests(data.data);

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