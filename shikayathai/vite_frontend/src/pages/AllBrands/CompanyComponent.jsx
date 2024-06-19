import star from "../../assets/star.svg";

const CompanyComponent = ({ company }) => {
  return (
    <div className="bg-[#001A450D] bg-opacity-5 rounded-2xl p-4 w-[25rem] my-2">
      {/* Company Logo and Name*/}
      <div className="flex flex-row mb-2">
        <div className="w-8 h-8 rounded-full bg-purple-200 text-white text-xl font-bold flex items-center justify-center mr-2">
          {company.name.charAt(0)}
        </div>
        <div>{company.name}</div>
      </div>
      {/* Rating and Reviews */}
      <div className="flex flex-row text-sm gap-2">
        <div className="bg-[#C9FF57] w-5 h-5 rounded-md flex items-center justify-center">
          <img src={star} />
        </div>
        <div>{company.rating ? company.rating: "0"}/100</div>
        <div>{company.complaints.length} reviews</div>
      </div>
    </div>
  );
};

export default CompanyComponent;
