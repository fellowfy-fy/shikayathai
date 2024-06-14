import { useEffect, useState } from "react";
import FrameComponent from "../FrameComponent/FrameComponent.jsx";
import api from "../../api/axios";
import { Link } from "react-router-dom";

function RecentRequestSection() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/complaints/list/");
        setRequests(response.data.results);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="text-center px-8 pt-10 bg-white">
      <h2 className="text-4xl font-bold text-[#001A45] font-unbounded mb-4">
        Recent Requests
      </h2>
      <Link to="complaints" className="text-[#001A45]">
        Watch all 
      </Link>
      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex space-x-8">
            {requests.map((request, index) => (
              <FrameComponent key={index} data={request} />
            ))}
          </div>
        </div>
      ) : (
        <p>No recent requests available.</p>
      )}
    </div>
  );
}

export default RecentRequestSection;
