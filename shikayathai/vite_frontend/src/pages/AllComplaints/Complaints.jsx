import navigationArrow from "../../assets/navigationArrow.svg";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import ComplaintComponent from "./ComplaintComponent";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get("/complaints/list/");
        setComplaints(response.data.results);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      }
    };

    fetchRequests();
    console.log(complaints);
  }, []);

  return (
    <div className="mx-[120px] mt-2 text-[#001A45]">
      {/* 1 line */}
      <div className="flex flex-row gap-2 mb-10">
        <span>Home</span>
        <img src={navigationArrow} />
        <span className="font-bold">All complaints</span>
      </div>

      {/* Title */}
      <div className="text-3xl font-bold font-unbounded mb-6">
        All complaints
      </div>

      {/* Company Components  */}
      <div className="flex flex-row gap-3 mb-8 flex-wrap">
        {complaints.map((complaint, index) => (
          <ComplaintComponent key={index} complaint={complaint} />
        ))}
      </div>
    </div>
  );
};

export default Complaints;
