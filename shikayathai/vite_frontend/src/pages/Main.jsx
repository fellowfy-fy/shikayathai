import { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import IntroSection from "../components/IntroSection/IntroSection.jsx";
import IntroSection2 from "../components/IntroSection/IntroSection2.jsx";
import RecentRequestsSection from "../components/RecentRequestSection/RecentReqeustSection.jsx";
import RecentReactionsSection from "../components/RecentReactionsSection/RecentReactionsSection.jsx";
import TopRatedCompaniesSection from "../components/TopRatedCompaniesSection/TopRatedCompaniesSection.jsx";
import StatisticsSection from "../components/StatisticsSection/StatisticsSection.jsx";
import FAQSection from "../components/FAQSection/FAQSection.jsx";
import OrganizationSection from "../components/OrganizationSection/OrganizationSection.jsx";
import FileComplaintForm from "../components/FileComplaintForm/FileComplaintForm.jsx";
import WhyFreeSection from "../components/WhyFreeSection.jsx";
import "../styles/global.css";

const Main = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <main className="main">
      <HeroSection onFileComplaintClick={toggleFormVisibility} />
      <IntroSection />
      <IntroSection2 />
      <WhyFreeSection />
      <RecentRequestsSection title="Recent requests" />
      <RecentReactionsSection title="Recent reactions" />
      <TopRatedCompaniesSection />
      <StatisticsSection />
      <FAQSection />
      <OrganizationSection />
      {isFormVisible && <FileComplaintForm closeForm={toggleFormVisibility} />}
    </main>
  );
};

export default Main;
