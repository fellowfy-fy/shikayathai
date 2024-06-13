import React, { useEffect, useState } from "react";
import FrameComponent from "../FrameComponent/FrameComponent.jsx";
import axios from 'axios';  // Import Axios

function RecentReactionsSection({ route }){
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const url = "http://127.0.0.1:8000/complaints/list/"  // Ensure this URL is correct
        const response = await axios.get(url);
        setReactions(response.data.results);
      } catch (error) {
        console.error("Failed to fetch reactions:", error);
      }
    };

    fetchReactions();
  }, []);

  return (
    <div className="text-center px-30 pt-40 bg-white">
      <h2 className="text-4xl font-bold text-[#001A45] font-unbounded mb-4">Recent Reactions</h2>
      {reactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reactions.map((reaction, index) => (
            <FrameComponent key={index} data={reaction} />
          ))}
        </div>
      ) : (
        <p>No recent reactions available.</p>
      )}
    </div>
  );
}

export default RecentReactionsSection;
