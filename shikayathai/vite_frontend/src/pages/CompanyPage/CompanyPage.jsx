import navigationArrow from "../../assets/navigationArrow.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ComplaintComponent from "../AllComplaints/ComplaintComponent";
import api from "../../api/axios";
import star from "../../assets/star.svg";
import wwwglobus from "../../assets/wwwglobus.svg";
import filtericon from "../../assets/filtericon.svg";

const CompanyPage = () => {
  const [company, setCompany] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const apiRes = await api.get(`companies/details/${id}`);
        setCompany(apiRes.data);
      } catch (error) {
        console.error("Error fetching complaint:", error);
      }
    };
    fetchCompany();
  }, [id]);

  console.lo

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mx-[120px] mt-2 text-[#1c1e22]">
        {/* 1 line */}
        <div className="flex flex-row gap-2 mb-10">
          <span>Home</span>
          <img src={navigationArrow} />
          <span className="font-bold">All complaints</span>
          <img src={navigationArrow} />
          <span className="font-bold">Brand Name</span>
        </div>
      </div>
      {/* Company detail */}
      <div className="bg-[#E4EFFF] py-8 w-full px-[120px]">
        {/* Company Logo and Name*/}
        <div className="flex flex-row mb-2">
          <div className="w-8 h-8 rounded-full bg-purple-200 text-white text-xl font-bold flex items-center justify-center mr-2">
            {company.name.charAt(0)}
          </div>
          <div>{company.name}</div>
        </div>
        {/* Rating and Reviews */}
        <div className="flex flex-row text-sm gap-2 mb-3">
          <div className="bg-[#C9FF57] w-5 h-5 rounded-md flex items-center justify-center">
            <img src={star} />
          </div>
          <div>{company.rating ? company.rating : "0"}/100</div>
          <div>{company.complaints.length} reviews</div>
        </div>
        {/* Company info */}
        <div className="flex flex-col gap-3">
          <p>{company.email}</p>
          <p>{company.phone}</p>
          <div className="flex flex-row gap-2 text-[#0450CF]">
            <img src={wwwglobus} />
            <p>{company.website}</p>
          </div>
        </div>
      </div>

      {/* Complaints  */}
      <div className="mx-[120px] mt-2 text-[#001A45]">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Complaints</h1>
        <div className="flex flex-row gap-2">
          <p className="font-bold">493 complaints</p>
          <p className="opacity-70">Over the past year</p>
        </div>
        {/* Filter */}
        <div className="mt-9 flex flex-row gap-2 text-base font-bold">
          <img src={filtericon} />
          <p>Filter</p>
        </div>
      </div>

      {/* Complaints Components */}
      <div className="flex flex-row gap-4 mt-8">
        {company.complaints.map((complaint, index) => (
          <ComplaintComponent key={index} complaint={complaint} />
        ))}
      </div></div>
    </div>
  );
};

export default CompanyPage;
