import { useState, useEffect, useCallback } from "react";
import { useModal } from "../../context/ModalContext";
import axios from "../../api/axios";
import debounce from "lodash/debounce";
import "../../styles/global.css";
import "./FileComplaintForm.css";
import close from "../../assets/close.svg";
import document from "../../assets/document.svg";
import InfoComponent from "../pop-ups/InfoComponent";
import ContactDetailsForm from "./ContactDetailsForm";
import AddCompanyForm from "./AddCompanyForm";
import FacebookShareComponent from "../FacebookShare/FacebookShare";
import useAuth from "../../hooks/useAuth";

const FileComplaintForm = () => {
  const { showModal, hideModal } = useModal();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandWebsite, setBrandWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showAddCompanyFields, setShowAddCompanyFields] = useState(false);
  const [error, setError] = useState(null);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const { auth, setAuth } = useAuth();

  const handleInfoClick = () => {
    showModal(<InfoComponent />);
  };

  useEffect(() => {
    if (company) {
      fetchCompanies(company);
    } else {
      setCompanies([]);
    }
  }, [company]);

  const fetchCompanies = useCallback(
    debounce(async (query) => {
      try {
        const response = await axios.get(`companies/list/?search=${query}`);
        setCompanies(response.data.results);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }, 300),
    []
  );

  const handleNextStep = (event) => {
    event.preventDefault();
    setStep(2);
  };

  const handleFileChange = (event, setFiles, setPreviews) => {
    const files = Array.from(event.target.files);
    setFiles(files);

    if (setPreviews) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setPreviews(previews);
    }
  };

  const handleCompanySelect = (companyName) => {
    setCompany(companyName);
    setCompanies([]);
    setShowAddCompanyFields(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("author", auth?.name);
    formData.append("company", company);
    formData.append("title", title);
    formData.append("brandPhone", brandPhone);
    formData.append("brandEmail", brandEmail);
    formData.append("brandWebsite", brandWebsite);
    formData.append("description", description);
    photos.forEach((photo) => formData.append("photos", photo));
    documents.forEach((document) => formData.append("documents", document));

    try {
      const response = await axios.post("complaints/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.access}`,
        },
      });
      const linkid = response.data.id;
      const complaintLink = `http://localhost/complaints/${linkid}`;
      showModal(
        <FacebookShareComponent link={complaintLink} linkid={linkid} />
      );
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  if (!auth?.name && step === 2) {
    return (
      <ContactDetailsForm
        complaintData={{
          company,
          title,
          brandPhone,
          brandEmail,
          brandWebsite,
          description,
          photos,
          documents,
        }}
        onBack={() => setStep(1)}
      />
    );
  }

  if (showAddCompanyFields) {
    return (
      <AddCompanyForm
        onBack={() => setShowAddCompanyFields(false)}
        onSubmit={handleSubmit}
        companyData={{ company, brandPhone, brandEmail, brandWebsite }}
        setCompanyData={({ company, brandPhone, brandEmail, brandWebsite }) => {
          setCompany(company);
          setBrandPhone(brandPhone);
          setBrandEmail(brandEmail);
          setBrandWebsite(brandWebsite);
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 z-20">
      <div className="relative bg-white p-6 rounded-[32px] shadow-lg w-full max-w-[800px] h-auto overflow-hidden">
        <div className="w-[257px] py-5 h-4 flex justify-between items-center z-10 ">
          <div className="absolute top-[1.90rem] left-[25px] w-[90px] h-1 bg-[#f2f6fd] z-10"></div>
          <div className="absolute top-[1.90rem] left-[25px]  w-[250px] h-1 bg-[#f2f6fd]"></div>
          <div className="absolute left-6 top-6 w-[257px] flex justify-between items-center z-30">
            <div className="rounded-full bg-[#0450CF] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#f2f6fd] w-4 h-4 z-20"></div>
            <div className="rounded-full bg-[#f2f6fd] w-4 h-4 z-50"></div>
          </div>
          <button
            className="absolute top-6 right-6 text-lg font-bold"
            onClick={hideModal}
          >
            <img src={close} alt="Close" />
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-[23px] font-unbounded font-bold text-[#001A45]">
            Fill in the details
          </h5>
        </div>
        {error && (
          <div className="p-4 rounded-md bg-red-100 text-red-700 mb-4">
            {error}
          </div>
        )}
        <div className="overflow-auto max-h-[70vh]">
          <form
            onSubmit={auth?.name ? handleSubmit : handleNextStep}
            className="mt-4"
          >
            <div className="mb-3">
              <label
                htmlFor="company"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Company Name
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Company"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
              {companies.length > 0 && (
                <ul className="list-group mt-2">
                  {companies.map((comp) => (
                    <li
                      key={comp.id}
                      className="list-group-item cursor-pointer p-2 border-b"
                      onClick={() => handleCompanySelect(comp.name)}
                    >
                      {comp.name}
                    </li>
                  ))}
                </ul>
              )}
              <p
                className="cursor-pointer font-inter font-light text-[16px] text-blue-600 hover:underline mt-1"
                onClick={() => setShowAddCompanyFields(true)}
              >
                Can't find your company? Add new
              </p>
            </div>
            <div className="w-full mb-4">
              <label
                htmlFor="title"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Title
              </label>
              <input
                type="text"
                className="block px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] font-inter text-[#001A45] placeholder-opacity-30 w-full"
                placeholder="Title of Your complaint"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Complaint Description
              </label>
              <p className="text-sm mb-2 font-inter text-[#001A45]">
                Include any details that will help Company to identify your case
                and resolve your issue as soon as possible. E.g. order id,
                receipt number, payment amount etc. Please note that the
                complaint description is public, please don’t include any
                personal details.
                <button
                  onClick={handleInfoClick}
                  className="underline text-blue-600 hover:text-blue-800 ml-1"
                >
                  Why is the complaint public?
                </button>
              </p>
              <textarea
                className="block w-full px-3 py-2 border border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Describe your issue"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label
                htmlFor="photos"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Images and documents
              </label>
              <p className="text-sm font-inter text-[#001A45]">
                Please attach any valuable images or photos: payment screenshot,
                the photo of the broken product, etc.
              </p>
              <p className="text-sm mb-2 font-inter text-[#001A45]">
                Please note that the photos are public.
              </p>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="photos"
                  onChange={(e) =>
                    handleFileChange(e, setPhotos, setPhotoPreviews)
                  }
                  multiple
                />
                <label
                  htmlFor="photos"
                  className="w-full lg:w-1/2 h-[56px] px-3 py-2 border border-[#001A45] rounded-[12px] border-opacity-50text-center cursor-pointer flex items-center justify-center font-semibold"
                >
                  Add Photos
                </label>
              </div>
              {photoPreviews.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 font-inter text-[#001A45] ">
                  {photoPreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index}`}
                      className="w-[80px] h-[80px] object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label
                htmlFor="documents"
                className="block font-bold mb-[4px] font-inter text-[24px] text-[#001A45]"
              >
                Documents
              </label>
              <p className="text-sm mb-2 font-inter text-[#001A45]">
                Please attach any documents. All the documents are private.
              </p>
              <div className="relative">
                <input
                  type="file"
                  className="hidden"
                  id="documents"
                  onChange={(e) => handleFileChange(e, setDocuments)}
                  multiple
                />
                <label
                  htmlFor="documents"
                  className="w-full h-[56px] px-3 py-2 border border-[#001A45] rounded-[12px] lg:w-1/2 border-opacity-50text-center cursor-pointer flex items-center justify-center font-semibold"
                >
                  Add Document
                </label>
              </div>
              {documents.length > 0 && (
                <ul className="list-none mt-2 font-semibold font-inter text-[#001A45] ">
                  {documents.map((doc, index) => (
                    <li
                      key={index}
                      className="text-lg flex gap-2 border border-[#001A454D] mb-2 rounded-xl p-3 w-1/2"
                    >
                      <img src={document} />
                      <span>{doc.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="w-full h-[55px] hover:bg-[#C9FF57] text-[#001A45] bg-[#B5F62B] active:bg-[#A9E922] text-[18px] font-semibold py-2 px-4 rounded-[12px]"
            >
              {auth?.name ? "Add complaint" : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileComplaintForm;
