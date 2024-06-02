import { useEffect, useState } from "react";
import axios from "../api/axios";



function Brands() {


  const [companies, setCompanies] = useState([]); 

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('api/companies/');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
              {companies.map(company => (
                <div key={company.id} value={company.id}>{company.name}</div>
              ))}
      </div>
    );
  }
  
  export default Brands;
  