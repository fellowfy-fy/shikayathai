import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import CompanyComponent from "../../pages/AllBrands/CompanyComponent";

const TopRatedCompaniesSection = () => {
  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("companies/list");
        setCompanies(response.data.results);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-left sm:text-center px-[24px] sm:mx-[120px] py-[40px] sm:py[80px]">
      <h2 className="text-[24px] sm:text-[32px] font-unbounded font-bold text-[#001A45] mb-4">
        Top rated companies
      </h2>
      <nav>
        <ul className="flex justify-left md:justify-center mb-8">
          <li>
            <Link
              to="/brands"
              className="text-base text-[#001A45] hover:underline"
            >
              Watch all
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-wrap justify-center gap-[8px]">
        {companies.map((company, index) => (
          <CompanyComponent key={index} company={company} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedCompaniesSection;
