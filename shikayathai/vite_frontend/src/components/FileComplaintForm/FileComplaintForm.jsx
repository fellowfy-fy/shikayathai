import { useState, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

const FileComplaintForm = () => {
  const { hideModal } = useModal();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]); 
  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const { auth } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('author', auth.name)
    formData.append('title', title);
    formData.append('description', description);
    formData.append('company', company);
    photos.forEach((photo, index) => formData.append(`photos[${index}]`, photo));
    documents.forEach((document, index) => formData.append(`documents[${index}]`, document));

    try {
      await axios.post('api/complaints/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.accessToken}`
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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('api/companies/');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">File a Complaint</h5>
        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">Company</label>
            <select className="form-control" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required>
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="photos" className="form-label">Photos</label>
            <input type="file" className="form-control" id="photos" onChange={(e) => handleFileChange(e, setPhotos)} multiple />
          </div>
          <div className="mb-3">
            <label htmlFor="documents" className="form-label">Documents</label>
            <input type="file" className="form-control" id="documents" onChange={(e) => handleFileChange(e, setDocuments)} multiple />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FileComplaintForm;
