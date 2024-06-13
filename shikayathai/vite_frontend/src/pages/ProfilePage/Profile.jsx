import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import api from '../../api/axios';
import './Profile.css';
import signOutIcon from '../../assets/sign-out-icon.svg'; // Ensure this path is correct
import useAuth from '../../hooks/useAuth';

function Profile() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null); // State for photo preview

  useEffect(() => {
    if (!auth?.access) {
      navigate('/'); 
    } 
    api.get('/api/profile', { headers: { Authorization: `Bearer ${auth.access}` } })
    .then(response => {
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhoto(response.data.photo);
    })
    .catch(error => console.error('Error fetching user data:', error));
  }, [auth.access, navigate]);

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Set photo preview
    }
  };

  const handleSaveChanges = () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedProfile = new FormData();
    updatedProfile.append('name', name);
    updatedProfile.append('email', email);
    if (password !== "") {
      updatedProfile.append('password', password);
    }
    if (photo && photo instanceof File) {
      updatedProfile.append('userpic', photo);
    }

    api.put('/api/profile/', updatedProfile, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.access}`
      }
    })
    .then(response => {
      alert('Changes saved!');
      const userpic = response?.data?.userpic;
      console.log(response.data)
      setAuth(prev => ({ ...prev, name, email, userpic }));
      setUser(response.data);
    })
    .catch(error => {
      console.error('Error saving changes:', error);
      // if (error.response && error.response.status === 401) {
      //   navigate('/login'); // Redirect to login if not authorized
      // }
    });
  };

  return (
    <div className="profile-page">
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <span>Profile</span>
      </div>
      <h2>Profile</h2>
      <div className="profile-form">
        <div className="photo-section">
          <img src={photoPreview || auth.userpic} alt="Profile" className="profile-photo" />
          <label htmlFor="photo-upload" className="choose-photo-label">Choose a photo</label>
          <input type="file" id="photo-upload" onChange={handlePhotoChange} className="choose-photo" />
        </div>
        <div className="form-fields">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Repeat Password</label>
            <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
          </div>
        </div>
        <button onClick={handleSaveChanges} className="save-changes-button">Save changes</button>
      </div>
      <button onClick={signOut} className="sign-out-button">
        <img src={signOutIcon} alt="Sign Out" />
      </button>
    </div>
  );
}

export default Profile;
