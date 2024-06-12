// RecentRequestSection.jsx
import React, { useEffect, useState } from "react";
import FrameComponent from "../FrameComponent/FrameComponent.jsx";
import axios from 'axios';  // Import Axios

function RecentReactionsSection({ route }){
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const url = "http://127.0.0.1:8000/complaints/list/"
      const data = await axios.get(url);
      setRequests(data.data.results);

    } catch (error) {

      console.error("Failed to fetch reactions:", error);

    }
  };

  return (
    <div className="recent-requests-section">
      <h2>Recent Reactions</h2>
      <div className="request-grid">
        {requests.map((request, index) => (
          <FrameComponent key={index} data={request} />
        ))}
      </div>
    </div>
  );
};

export default RecentReactionsSection;