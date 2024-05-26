import React from "react";
import Header from "../components/main/Header"
import HeroSection from "../components/main/HeroSection";
import IntroSection from "../components/main/IntroSection";
import RecentRequestsSection from "../components/main/RecentReqeustSection";
import TopRatedCompaniesSection from "../components/main/TopRatedCompaniesSection";
import StatisticsSection from "../components/main/StatisticsSection";
import FAQSection from "../components/main/FAQSection";
import OrganizationSection from "../components/main/OrganizationSection";
import Footer from "../components/main/Footer";
import "../styles/Main.css";

const Main = () => {
  return (
    <main className="main">
      <Header />
      <HeroSection />
      <IntroSection />
      <RecentRequestsSection title="Recent requests" />
      <RecentRequestsSection title="Recent reactions" />
      <TopRatedCompaniesSection />
      <StatisticsSection />
      <FAQSection />
      <OrganizationSection />
      <Footer />
    </main>
  );
};

export default Main;
