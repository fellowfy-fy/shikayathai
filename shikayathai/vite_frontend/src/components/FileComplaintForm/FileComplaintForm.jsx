import { useState, useEffect, useCallback } from 'react';
import { useModal } from '../../context/ModalContext';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import InfoComponent from '../pop-ups/InfoComponent';
import debounce from 'lodash/debounce';

const FileComplaintForm = () => {
  const { showModal, hideModal } = useModal();
  const [company, setCompany] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [title, setTitle] = useState('');
  const [brandPhone, setBrandPhone] = useState('');
  const [brandEmail, setBrandEmail] = useState('');
  const [brandWebsite, setBrandWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [privateDetails, setPrivateDetails] = useState('');
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [showAddCompanyFields, setShowAddCompanyFields] = useState(false);
  const { auth } = useAuth();

  const handleInfoClick = () => {
    setIsVisible(false);  
    showModal(<InfoComponent onOk={() => setIsVisible(true)} />);  
  };
 

  useEffect(() => {
    if (company) {
      fetchCompanies(company);
    } else {
      setCompanies([]);
    }
  }, [company]);

  const fetchCompanies = useCallback(debounce(async (query) => {
    try {
      const response = await axios.get(`companies/list/?search=${query}`);
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }, 300), []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('author', auth?.name);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('brandPhone', brandPhone);
    formData.append('brandEmail', brandEmail);
    formData.append('brandWebsite', brandWebsite);
    formData.append('description', description);
    formData.append('privateDetails', privateDetails);
    photos.forEach((photo) => formData.append(`photos`, photo));
    documents.forEach((document) => formData.append(`documents`, document));
    try {
      await axios.post('complaints/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth?.access}`
        }
      });
      hideModal();
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleFileChange = (event, setFiles) => {
    setFiles(Array.from(event.target.files));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4">
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-[800px] h-auto overflow-hidden">
        <div className="modal-header flex justify-between items-center">
          <h5 className="modal-title text-lg font-bold">File a Complaint</h5>
          <button type="button" className="btn-close" onClick={hideModal} aria-label="Close">
            <span>&times;</span>
          </button>
        </div>
        {error && <div className="alert alert-danger p-4 rounded-md bg-red-100 text-red-700">{error}</div>}
        <div className="overflow-auto max-h-[70vh]">
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company Name</label>
            <input type="text" className="form-control" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="brandPhone" className="form-label">Brand Phone</label>
            <input type="text" className="form-control" id="brandPhone" value={brandPhone} onChange={(e) => setBrandPhone(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="brandEmail" className="form-label">Brand Email</label>
            <input type="email" className="form-control" id="brandEmail" value={brandEmail} onChange={(e) => setBrandEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="brandWebsite" className="form-label">Brand Website</label>
            <input type="url" className="form-control" id="brandWebsite" value={brandWebsite} onChange={(e) => setBrandWebsite(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Complaint Description</label>
            <p className="form-description">
                Include any details that will help Company to identify your case resolve your issue as soon as possible. 
                E.g. order id, receipt number, payment amount etc. 
                Please note that the complaint description is public, please don’t include any personal details.
            </p>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="privateDetails" className="form-label">Private Details</label>
            <textarea
              className="form-control"
              id="privateDetails"
              value={privateDetails}
              onChange={(e) => setPrivateDetails(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="form-label">Photos and Images</label>
            <p className="form-description">
                please attache any valuable images or photos: payment screenshot, the photo of the broken product etc.
                Please note that the photos are public
            </p>
            <input
              type="file"
              className="form-control"
              id="photos"
              onChange={(e) => handleFileChange(e, setPhotos)}
              multiple
            />
          </div>
          <div className="mb-3">
            <label htmlFor="documents" className="form-label">Documents</label>
            <p className="form-description">
                Please attache any documents.
                All the document are private.
            </p>
            <input
              type="file"
              className="form-control"
              id="documents"
              onChange={(e) => handleFileChange(e, setDocuments)}
              multiple
            />
          </div>
          <button type="submit" className="btn btn-primary">Add complaint</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default FileComplaintForm;
