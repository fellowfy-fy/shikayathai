import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FrameComponent = ({ data }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    if (data?.id) {
      navigate(`/complaints/${data.id}`);
    } else {
      console.log("No complaint ID available for navigation.");
    }
  };

  if (!data?.title) {
    return <div>Loading or no data available...</div>;
  }

  const handleCompanyClick = () => {
    if (data?.company) {
      navigate(`/companies/${data.company}`);
    } else {
      console.log("No company ID available for navigation.");
    }
  };

  return (
    <div className="bg-gray-100 rounded-[16px] p-4 min-w-[280px] max-w-[280px] min-h-[320px] max-h-[320px] relative text-left mt-[24px]">
      <div className="flex items-center gap-2 mb-4 mt-4 ml-4">
        <img
          src={data.author_userpic}
          alt={data.author_name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <h4 className="text-lg font-bold">{data.author_name}</h4>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-purple-200 text-white text-xs font-bold flex items-center justify-center mr-2">
              {data.company_name.charAt(0)}
            </div>
            <p
              className="text-sm hover:cursor-pointer"
              onClick={handleCompanyClick}
            >
              {data.company_name}
            </p>
          </div>
        </div>
      </div>
      <div
        className="px-4 text-sm overflow-hidden relative"
        style={{ height: "200px" }}
      >
        {data.description}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-100 to-transparent"></div>
      </div>
      {data.description && (
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#001A45] hover:border border-[#001A45] active:border-opacity-50 activate:text-opacity-50 font-Inter py-2 px-6 rounded-full"
          onClick={handleReadMoreClick}
        >
          read more
        </button>
      )}
    </div>
  );
};

FrameComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_name: PropTypes.string,
    author_avatar: PropTypes.string,
    company_name: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default FrameComponent;
