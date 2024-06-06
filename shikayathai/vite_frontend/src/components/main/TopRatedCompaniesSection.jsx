import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Main/TopRatedSection.css';

const TopRatedCompaniesSection = () => {
    const companies = [
        { name: "Company Name", rating: "10/100", reviews: 184 },
        { name: "Company Name", rating: "10/100", reviews: 184 },
        { name: "Company Name", rating: "10/100", reviews: 184 },
        // Add more companies as needed
    ];

    return (
        <section className="top-rated-companies-section">
            <h2>Top rated companies</h2>
            <nav>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link watch-all" to="/brands">
                            Watch all
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="company-cards">
                {companies.map((company, index) => (
                    <div className="company-card" key={index}>
                        <div className="company-icon">CN</div>
                        <h3>{company.name}</h3>
                        <div className="company-rating">
                            <span className="star-icon">★</span>
                            {company.rating}
                        </div>
                        <div className="company-reviews">
                            {company.reviews} reviews
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopRatedCompaniesSection;
