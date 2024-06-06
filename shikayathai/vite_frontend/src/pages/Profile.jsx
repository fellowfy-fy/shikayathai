import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import api from '../api/axios';
import '../styles/Profile.css';
import signOutIcon from '../assets/sign-out-icon.svg'; // Ensure this path is correct
import useAuth from '../hooks/useAuth';

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

  useEffect(() => {
    // Fetch user data from the backend
    api.get('/api/users/profile/', { headers: {
      Authorization: `Bearer ${auth.accessToken}`
    }})
    .then(response => {
      setUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setPhoto(response.data.photo);
    })
    .catch(error => console.error('Error fetching user data:', error));
  }, [auth.accessToken]);

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSaveChanges = () => {
    if (password === "") {
      alert('Confirm password')
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    const updatedProfile = new FormData();
    updatedProfile.append('name', name);
    updatedProfile.append('email', email);
    if (password) {
      updatedProfile.append('password', password);
    }
    if (photo && photo instanceof File) {
      updatedProfile.append('userpic', photo);
    }

    api.put('/api/users/profile/', updatedProfile, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      alert('Changes saved!');
      const accessToken = response?.data?.access;
      setAuth(prev => ({ ...prev, accessToken, name, email }));
      setUser(response.data);
    })
    .catch(error => {
      console.error('Error saving changes:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login if not authorized
      }
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
          <img src={ auth.userpic || 'path_to_default_image.png' } alt="Profile" className="profile-photo" />
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
