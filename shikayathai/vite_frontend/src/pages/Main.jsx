import React from "react";
import PropTypes from "prop-types";
import "../styles/Main.css";
import FrameComponent "./components/FrameComponent";
import FrameComponent1 "./components/FrameComponent1";



function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img className="logo-icon" alt="Logo" src="/frame-7.svg" />
        <b className="brand-name">{BRAND_NAME}</b>
      </div>
      <nav className="navigation">
        <button className="nav-item accent-text">Home</button>
        <button className="nav-item">All complaints</button>
        <button className="nav-item">All brand</button>
      </nav>
      <div className="user-profile">
        <img className="user-photo" alt="User Profile" src="/user-photo@2x.png" />
        <div className="nav-item">Profile</div>
      </div>
    </header>
  );
}

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-image" />
    <img className="hero-graphic" alt="Graphic" src="/aeroshkin-indian-guy-holding-a-receipt-is-very-happy-bacuse-he-ab2fe742-1-1@2x.png" />
    <div className="hero-title-wrapper">
      <b className="hero-title">{FREE_COMPLAINT_PLATFORM}</b>
    </div>
    <button className="cta-button" onClick={() => alert('Complaint filed!')}>
      {FILE_A_COMPLAINT}
    </button>
    <div className="hero-subtitle">
      Turning grievances into wins, guaranteed
    </div>
  </section>
);

const IntroSection = () => (
  <section className="intro-section">
    <div className="intro-content">
      <div className="intro-title-wrapper">
        <b className="intro-title">Welcome to {BRAND_NAME}!</b>
      </div>
      <div className="intro-text">
        Here, we make sure your complaints get heard and fixed, fast. File
        Your Complaint Easily:
      </div>
    </div>
    <button onClick={() => alert("Step to filing a complaint clicked!")}>Describe Your Issue</button>
  </section>
);

const RecentRequestsSection = ({ title }) => (
  <section className="recent-requests-section">
    <h2 className="section-title">{title}</h2>
    <div className="request-list">
      <RequestItem userInitials="An" userName="Anjali" companyName="SuryaTech" complaintText="sampletext"/>
    </div>
    <div className="pagination-buttons">
      <button onClick={() => alert("Previous page")}>Previous</button>
      <button onClick={() => alert("Next page")}>Next</button>
    </div>
  </section>
);

RecentRequestsSection.propTypes = {
  title: PropTypes.string.isRequired,
};

const RequestItem = () => (
  <div className="request-item">
    <div className="user-info">
      <div className="user-photo">{userInitials}</div>
      <div className="user-details">
        <div className="user-name">{userName}</div>
        <div className="user-company">{companyName}</div>
      </div>
    </div>
    <div className="request-text">{complaintText}</div>
    <button onClick={() => alert("Read more about this complaint!")}>Read More</button>
  </div>
);

const TopRatedCompaniesSection = () => (
  <section className="top-rated-section">
    <h2 className="section-title">Top rated companies</h2>
    <div className="company-list">
      {/* CompanyItem компоненты */}
    </div>
  </section>
);

const CompanyItem = () => (
  <div className="company-item">
    <div className="company-info">
      <div className="company-initials-wrapper">
        <b className="company-initials">{companyInitials}</b>
      </div>
      <b className="company-name">{companyName}</b>
    </div>
    <div className="company-rating">
      <div className="rating-value">{rating}</div>
      <div className="reviews-count">{reviews} reviews</div>
    </div>
  </div>
);

const StatisticsSection = () => (
  <section className="statistics-section">
  <div className="section-header">
    <div className="section-logo">
      <img className="logo-icon" alt="" src="/frame-71.svg" />
      <b className="brand-name">{BRAND_NAME}</b>
    </div>
    <div className="section-title-wrapper">
      <b className="section-title">in numbers</b>
    </div>
  </div>
  <div className="statistics-content">
    <div className="statistics-list">
      <div className="statistic-item">
        <b className="statistic-value">1 500 000+</b>
        <b className="statistic-label">active users</b>
      </div>
    </div>
    <button className="cta-button" onClick={() => alert('Statistical data clicked!')}>
      More Statistics
    </button>
  </div>
</section>
);

const FAQSection = () => (
  <section className="faq-section">
    <div className="section-header">
      <div className="section-title-wrapper">
        <b className="section-title">FAQ</b>
      </div>
      <div className="section-subtitle">Your Guide to Getting Heard</div>
    </div>
    <div className="faq-list">
      <div className="faq-item">
        <b className="faq-question">How do I file a complaint?</b>
        <div className="faq-answer">
          Just share your ordeal, and we'll escalate it - both on our
          platform and by filing an official complaint through the Indian
          Consumer Helpline and directly to the company.
        </div>
      </div>
    </div>
  </section>
);

const OrganizationSection = () => (
  <section className="organization-section">
    <div className="section-background" />
    <div className="section-header">
      <div className="section-title-wrapper">
        <b className="section-title">Create Your Organization's Page Today!</b>
      </div>
      <div className="section-subtitle">
        Empower your business by creating a page on our platform. Here's
        why:
      </div>
    </div>
    <button onClick={() => alert('Create your organization page!')}>Create</button>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo">
      <img className="logo-icon" alt="" src="/frame-72.svg" />
      <b className="brand-name">{BRAND_NAME}</b>
    </div>
    <div className="footer-links">
      <button className="link">About Us</button>
      <button className="link">Terms</button>
      <button className="link">Privacy policy</button>
    </div>
    <div className="footer-text">
      <div>{`${BRAND_NAME} 2024 all rights reserved`}</div>
    </div>
  </footer>
);

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

// Константы
const BRAND_NAME = "Shikayathai";
const FREE_COMPLAINT_PLATFORM = "FREE complaint platform";
const FILE_A_COMPLAINT = "File a complaint";

export default Main;