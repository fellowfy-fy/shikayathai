import React from 'react';
import { Link } from 'react-router-dom';

const TopRatedCompaniesSection = () => {
    const companies = [
        { name: "Company Name", rating: "10/100", reviews: 184 },
        { name: "Company Name", rating: "10/100", reviews: 184 },
        { name: "Company Name", rating: "10/100", reviews: 184 },
    ];

    return (
        <section className="text-center px-30 pt-40 pb-20">
            <h2 className="text-2xl font-bold text-[#001A45] mb-4">Top rated companies</h2>
            <nav>
                <ul className="flex justify-center mb-8">
                    <li>
                        <Link to="/brands" className="text-base text-[#001A45] hover:underline">
                            Watch all
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex flex-wrap justify-center gap-4">
                {companies.map((company, index) => (
                    <div className="bg-[#f8f9fa] rounded-lg p-4 w-50 text-left shadow-md" key={index}>
                        <div className="w-12 h-12 rounded-full bg-[#e9ecef] flex justify-center items-center text-2xl text-[#001A45] mb-4">
                            CN
                        </div>
                        <h3 className="text-base font-bold text-[#001A45] mb-2">{company.name}</h3>
                        <div className="flex items-center text-base text-[#28a745] mb-2">
                            <span className="text-[#ffc107] mr-1">★</span>
                            {company.rating}
                        </div>
                        <div className="text-sm text-[#6c757d]">
                            {company.reviews} reviews
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopRatedCompaniesSection;
