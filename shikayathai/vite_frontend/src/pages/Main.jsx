import { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import IntroSection from "../components/IntroSection/IntroSection.jsx";
import RecentRequestsSection from "../components/RecentRequestSection/RecentReqeustSection.jsx";
import TopRatedCompaniesSection from "../components/TopRatedCompaniesSection/TopRatedCompaniesSection.jsx";
import StatisticsSection from "../components/StatisticsSection/StatisticsSection.jsx";
import FAQSection from "../components/FAQSection/FAQSection.jsx";
import OrganizationSection from "../components/OrganizationSection/OrganizationSection.jsx";
import FileComplaintForm from "../components/FileComplaintForm/FileComplaintForm.jsx";



const Main = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <main className="main">
      <HeroSection onFileComplaintClick={toggleFormVisibility} />
      <IntroSection />
      <RecentRequestsSection title="Recent requests" />
      <TopRatedCompaniesSection />
      <StatisticsSection />
      <FAQSection />
      <OrganizationSection />
      {isFormVisible && <FileComplaintForm closeForm={toggleFormVisibility} />}
    </main>
  );
};

export default Main;
