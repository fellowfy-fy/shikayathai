import { useEffect, useState } from "react";
import { useModal } from '../../context/ModalContext';
import axios from "../../api/axios";
import CompanyForm from "../../components/CompanyForm/CompanyForm"

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
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="hero-content">
        <div className="hero-title-wrapper">
          <h1 className="hero-title">All brands</h1>
          <button className="cta-button" onClick={handleFileComplaintClick}>
            Add a company
          </button>
        </div>
      </div>
      {companies.map((company) => (
        <div key={company.id} value={company.id}>
          {company.name}
        </div>
      ))}
    </div>
  );
}

export default Brands;
