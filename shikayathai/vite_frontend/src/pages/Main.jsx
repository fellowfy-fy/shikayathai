import React from "react";
import PropTypes from "prop-types";
import "../styles/Main.css";
import FrameComponent from "../components/FrameComponent";
import FrameComponent1 from "../components/FrameComponent1";

const Header = () => (
  <header className="header">
    <div className="logo">
      <img className="logo-icon" alt="Logo" src="/frame-7.svg" />
      <b className="brand-name">{BRAND_NAME}</b>
    </div>
    <nav className="navigation">
      <div className="nav-item accent-text">Home</div>
      <div className="nav-item">All complaints</div>
      <div className="nav-item">All brand</div>
    </nav>
    <div className="user-profile">
      <img className="user-photo" alt="User Profile" src="/user-photo@2x.png" />
      <div className="nav-item">Profile</div>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-image" />
    <img
      className="hero-graphic"
      alt="Indian guy holding a receipt"
      src="/aeroshkin-indian-guy-holding-a-receipt-is-very-happy-bacuse-he-ab2fe742-1-1@2x.png"
    />
    <div className="hero-title-wrapper">
      <b className="hero-title">{FREE_COMPLAINT_PLATFORM}</b>
    </div>
    <div className="cta-button">
      <div className="cta-text">{FILE_A_COMPLAINT}</div>
    </div>
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
    <div className="intro-steps">
      <div className="step">
        <div className="step-number-wrapper">
          <b className="step-number">1</b>
        </div>
        <b className="step-title">Describe Your Issue:</b>
        <div className="step-description">Let us know what went wrong.</div>
      </div>
      {/* Остальные шаги */}
    </div>
    <div className="intro-image-wrapper">
      <img className="intro-image" alt="" src="/frame-35.svg" />
      <div className="intro-image-text">
        Our platform aims to foster constructive dialogues between
        consumers and companies, leading to mutually beneficial
        resolutions.
      </div>
    </div>
  </section>
);

const RecentRequestsSection = ({ title }) => (
  <section className="recent-requests-section">
    <h2 className="section-title">{title}</h2>
    <div className="request-list">
      <RequestItem />
      {/* Остальные RequestItem компоненты */}
    </div>
    <div className="pagination-buttons">
      <img
        className="pagination-icon"
        alt="Previous"
        src="/majesticonsarrowupline.svg"
      />
      <img
        className="pagination-icon"
        alt="Next"
        src="/majesticonsarrowupline1.svg"
      />
    </div>
  </section>
);

RecentRequestsSection.propTypes = {
  title: PropTypes.string.isRequired,
};

const RequestItem = () => (
  <div className="request-item">
    <div className="user-info">
      <div className="user-photo">
        <div className="user-initials">An</div>
      </div>
      <div className="user-details">
        <div className="user-name">Anjali</div>
        <div className="user-company">
          <div className="company-initials-wrapper">
            <div className="company-initials">St</div>
          </div>
          <div className="company-name">SuryaTech</div>
        </div>
      </div>
    </div>
    <div className="request-text">
      sampletext
    </div>
    <div className="read-more-button">
      <div className="read-more-text">read more</div>
    </div>
    <div className="company-response">
      <img className="company-logo" alt="" src="/frame-7.svg" />
      <div className="response-text">
        sampletext
      </div>
    </div>
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
        <b className="company-initials">CN</b>
      </div>
      <b className="company-name">Company Name</b>
    </div>
    <div className="company-rating">
      <div className="rating-value">
        <img className="rating-icon" alt="" src="/frame-101.svg" />
        <div className="rating-text">10/100</div>
      </div>
      <div className="reviews-count">184 reviews</div>
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
        {/* Остальные элементы статистики */}
      </div>
      <div className="cta-button">
        <div className="cta-text">{FILE_A_COMPLAINT}</div>
      </div>
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
      {/* Остальные элементы FAQ */}
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
    <div className="benefits-list">
      <div className="benefit-item">
        <div className="benefit-number-wrapper">
          <b className="benefit-number">1</b>
        </div>
        <b className="benefit-title">Build Trust</b>
        <div className="benefit-description">
          Showcase your commitment to customer satisfaction and
          transparency.
        </div>
      </div>
      {/* Остальные элементы преимуществ */}
    </div>
    <div className="section-footer">
      <div className="section-icon">
        <img
          className="icon"
          alt=""
          src="/materialsymbolsbusinesscenteroutlinerounded.svg"
        />
        <div className="section-footer-text">
          <b>
            <p>
              Join us and forge stronger relationships with your customers
            </p>
            <p>
              — start by creating your organization's page now!
            </p>
          </b>
        </div>
      </div>
      <div className="cta-button">
        <div className="cta-text">Create</div>
        <img
          className="cta-icon"
          alt=""
          src="/majesticonsarrowupline2.svg"
        />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-logo">
      <img className="logo-icon" alt="" src="/frame-72.svg" />
      <b className="brand-name">{BRAND_NAME}</b>
    </div>
    <div className="footer-links">
      <div className="link-group">
        <div className="link">About Us</div>
        <div className="link">Terms</div>
        <div className="link">Privacy policy</div>
      </div>
      <div className="link-group">
        <div className="link">Noida</div>
        <div className="link">+91-8447078784</div>
      </div>
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