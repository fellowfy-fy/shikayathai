import React, { useState } from 'react';

const FileComplaintForm = ({ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    title: '',
    brandPhone: '',
    brandEmail: '',
    brandWebsite: '',
    complaintDescription: '',
    privateDetails: '',
    photos: [], // Assuming photos are handled as an array of file objects
    documents: [] // Documents as an array of file objects
  });

  // Handles changes to the text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles file inputs for photos and documents
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files
    }));
  };

  // Submits the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically handle the submission to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isAuthenticated && (
        <>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required={!isAuthenticated} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required={!isAuthenticated} />
          </label>
        </>
      )}
      <label>
        Company Name:
        <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
      </label>
      {isAuthenticated && (
        <>
          <label>
            Brand Phone:
            <input type="text" name="brandPhone" value={formData.brandPhone} onChange={handleInputChange} />
          </label>
          <label>
            Brand Email:
            <input type="email" name="brandEmail" value={formData.brandEmail} onChange={handleInputChange} />
          </label>
          <label>
            Brand Website:
            <input type="url" name="brandWebsite" value={formData.brandWebsite} onChange={handleInputChange} />
          </label>
        </>
      )}
      <label>
        Complaint Description:
        <textarea name="complaintDescription" value={formData.complaintDescription} onChange={handleInputChange} required></textarea>
      </label>
      <label>
        Private Details:
        <textarea name="privateDetails" value={formData.privateDetails} onChange={handleInputChange} required></textarea>
      </label>
      <label>
        Photos and Images:
        <input type="file" name="photos" multiple onChange={handleFileChange} />
      </label>
      <label>
        Documents:
        <input type="file" name="documents" multiple onChange={handleFileChange} />
      </label>
      <button type="submit">Add Complaint</button>
      <button type="button" class="btn-close" aria-label="Close"></button>
    </form>
  );
};

export default FileComplaintForm;
