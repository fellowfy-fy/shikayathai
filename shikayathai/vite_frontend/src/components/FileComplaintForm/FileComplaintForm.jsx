import { useState, useEffect, useCallback } from "react";
import { useModal } from "../../context/ModalContext";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import InfoComponent from "../pop-ups/InfoComponent";
import FacebookShareComponent from "../FacebookShare/FacebookShare";
import debounce from "lodash/debounce";
import "../../styles/global.css";
import "./FileComplaintForm.css"

const FileComplaintForm = () => {
  const { showModal, hideModal } = useModal();
  const [company, setCompany] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandWebsite, setBrandWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [privateDetails, setPrivateDetails] = useState("");
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showAddCompanyFields, setShowAddCompanyFields] = useState(false);
  const [error, setError] = useState(null);
  const { auth, setAuth } = useAuth();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleInfoClick = () => {
    setIsVisible(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth?.name) {
      try {
        // Register user if not authenticated
        const registrationResponse = await axios.post("api/register/", {
          name: userName,
          email: userEmail,
        });
        // Assuming registration API returns the new user's name and access token
        const { name, access } = registrationResponse.data;
        auth.name = name;
        auth.access = access;
        // Send password to user via email
      } catch (error) {
        setError(
          error.response?.data?.message || "Registration error occurred"
        );
        return;
      }
    }

    const formData = new FormData();
    formData.append("author", auth?.name);
    formData.append("company", company);
    formData.append("title", title);
    formData.append("brandPhone", brandPhone);
    formData.append("brandEmail", brandEmail);
    formData.append("brandWebsite", brandWebsite);
    formData.append("description", description);
    formData.append("privateDetails", privateDetails);
    photos.forEach((photo) => formData.append("photos", photo));
    documents.forEach((document) => formData.append("documents", document));

    try {
      const response = await axios.post("complaints/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.access}`,
        },
      });
      const complaintLink = `http://localhost/complaints/${response.data.id}`;
      setIsVisible(false);
      if (!auth.email) {
        setAuth({});
      }
      showModal(<FacebookShareComponent link={complaintLink} />);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
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

  const [photoPreviews, setPhotoPreviews] = useState([]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
    <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-[800px] h-auto overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-lg font-bold">File a Complaint</h5>
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900"
          onClick={hideModal}
          aria-label="Close"
        >
          <span>&times;</span>
        </button>
      </div>
      {error && (
        <div className="p-4 rounded-md bg-red-100 text-red-700 mb-4">
          {error}
        </div>
      )}
      <div className="overflow-auto max-h-[70vh]">
        <form onSubmit={handleSubmit} className="mt-4">
          {!auth?.name && (
            <>
              <div className="mb-3">
                <label htmlFor="userName" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  type="name"
                  className="form-control p-2 border rounded-lg"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userEmail" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control p-2 border rounded-lg"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          
          <div className="mb-3">
            <label htmlFor="company" className="block font-semibold mb-1">
              Company Name
            </label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded-lg"
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
          </div>
          <p
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => setShowAddCompanyFields(true)}
          >
            Can't find your company? Add new
          </p>
          {showAddCompanyFields && (
            <>
              <div className="mb-3">
                <label htmlFor="brandPhone" className="block font-semibold mb-1">
                  Brand Phone
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 border rounded-lg"
                  id="brandPhone"
                  value={brandPhone}
                  onChange={(e) => setBrandPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandEmail" className="block font-semibold mb-1">
                  Brand Email
                </label>
                <input
                  type="email"
                  className="form-control w-full p-2 border rounded-lg"
                  id="brandEmail"
                  value={brandEmail}
                  onChange={(e) => setBrandEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brandWebsite" className="block font-semibold mb-1">
                  Brand Website
                </label>
                <input
                  type="url"
                  className="form-control w-full p-2 border rounded-lg"
                  id="brandWebsite"
                  value={brandWebsite}
                  onChange={(e) => setBrandWebsite(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label htmlFor="title" className="block font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              className="form-control w-full p-2 border rounded-lg"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="block font-semibold mb-1">
              Complaint Description
            </label>
            <p className="text-sm mb-2">
              Include any details that will help Company to identify your case and resolve your issue as soon as possible. E.g. order id, receipt number, payment amount etc. Please note that the complaint description is public, please don’t include any personal details.
              <button
                onClick={handleInfoClick}
                className="underline text-blue-600 hover:text-blue-800 ml-1"
              >
                why the complaint is public?
              </button>
            </p>
            <textarea
              className="form-control w-full p-2 border rounded-lg"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="privateDetails" className="block font-semibold mb-1">
              Private Details
            </label>
            <textarea
              className="form-control w-full p-2 border rounded-lg"
              id="privateDetails"
              value={privateDetails}
              onChange={(e) => setPrivateDetails(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="block font-semibold mb-1">
              Photos and Images
            </label>
            <p className="text-sm mb-2">
              Please attach any valuable images or photos: payment screenshot, the photo of the broken product etc. Please note that the photos are public.
            </p>
            <input
              type="file"
              className="form-control w-full p-2 border rounded-lg"
              id="photos"
              onChange={(e) => handleFileChange(e, setPhotos, setPhotoPreviews)}
              multiple
            />
            {photoPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {photoPreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="documents" className="block font-semibold mb-1">
              Documents
            </label>
            <p className="text-sm mb-2">
              Please attach any documents. All the documents are private.
            </p>
            <input
              type="file"
              className="form-control w-full p-2 border rounded-lg"
              id="documents"
              onChange={(e) => handleFileChange(e, setDocuments)}
              multiple
            />
            {documents.length > 0 && (
              <ul className="list-disc pl-5 mt-2">
                {documents.map((doc, index) => (
                  <li key={index} className="text-sm">
                    {doc.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            className="w-full hover:bg-[#B5F62B] text-[#001A45] bg-[#A9E922] active:bg-[#C9FF57] font-semibold py-2 px-4 rounded-xl"
          >
            Add complaint
          </button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default FileComplaintForm;
