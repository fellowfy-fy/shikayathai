// RecentRequestSection.jsx
import React, { useEffect, useState } from "react";
import FrameComponent from "./FrameComponent";
import "../../styles/RecentRequestSection.css"
import axios from 'axios';  // Import Axios

function RecentRequestSection({ route }){
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const url = "http://127.0.0.1:8000/api/complaints/get/"
      const data = await axios.get(url);
      console.log(data.data)
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