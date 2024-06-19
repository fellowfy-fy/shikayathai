import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext";
import axios from "../../api/axios";
import navigationArrow from "../../assets/navigationArrow.svg";
import loopa from "../../assets/loopa.svg";
import CompanyForm from "../../components/CompanyForm/CompanyForm";
import CompanyComponent from "./CompanyComponent";

function Brands() {
  const [companies, setCompanies] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("companies/list");
        setCompanies(response.data.results);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleFileComplaintClick = () => {
    showModal(<CompanyForm />);
  };

  return (
    <div className="mx-[24px] sm:mx-[120px] mt-2 text-[#001A45]">
      {/* 1 line */}
      <div className="flex flex-row gap-2 mb-10">
        <span>Home</span>
        <img src={navigationArrow} />
        <span className="font-bold">All brands</span>
      </div>

      {/* Title */}
      <div className="text-3xl font-bold font-unbounded mb-6">All brands</div>

      {/* Search */}
      <div className="flex flex-row p-3 gap-2 border rounded-xl items-center max-w-[640px] mb-6">
        <button>
          <img src={loopa} />
        </button>
        <input placeholder="Search brand" className="w-full" />
      </div>

      {/* Company Components  */}
      <div className="flex flex-row gap-3 mb-8 flex-wrap">
        {companies.map((company, index) => (
          <CompanyComponent key={index} company={company} />
        ))}
      </div>
    </div>
  );
}

export default Brands;
