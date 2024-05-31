import { useState } from "react";
import HeroSection from "../components/main/HeroSection";
import IntroSection from "../components/main/IntroSection";
import RecentRequestsSection from "../components/main/RecentReqeustSection";
import TopRatedCompaniesSection from "../components/main/TopRatedCompaniesSection";
import StatisticsSection from "../components/main/StatisticsSection";
import FAQSection from "../components/main/FAQSection";
import OrganizationSection from "../components/main/OrganizationSection";
import FrameComponent from "../components/main/FrameComponent";
import FileComplaintForm from "../components/main/FileComplaintForm";

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
      <FrameComponent />
      <RecentRequestsSection title="Recent reactions" route="/api/complaints/"/>
      <TopRatedCompaniesSection />
      <StatisticsSection />
      <FAQSection />
      <OrganizationSection />
      {isFormVisible && <FileComplaintForm closeForm={toggleFormVisibility} />}
    </main>
  );
};

export default Main;
