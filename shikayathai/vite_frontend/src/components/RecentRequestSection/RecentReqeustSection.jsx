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
    <div className="text-center px-30 pt-40 bg-white">
      <h2 className="text-4xl font-bold text-[#001A45] font-unbounded mb-4">Recent Requests</h2>
      {/* Optional link - Uncomment if needed */}
      {/* <nav className="mb-6">
        <ul className="flex justify-center">
          <li>
            <Link to="/complaints" className="text-base text-[#001A45] hover:underline flex items-center">
              Watch all
            </Link>
          </li>
        </ul>
      </nav> */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request, index) => (
            <FrameComponent key={index} data={request} />
          ))}
        </div>
      ) : (
        <p>No recent requests available.</p>
      )}
    </div>
  );
}

export default RecentRequestSection;
