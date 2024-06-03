import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import axios from 'axios';
import '../styles/Profile.css';
import signOutIcon from '../assets/sign-out-icon.svg'; // Ensure this path is correct

function Profile() {
  const navigate = useNavigate();
  const logout = useLogout();
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoto(response.data.photo);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    // Implement logic to upload the photo to the backend
  };

  const handleSaveChanges = () => {
    // Implement logic to save changes to the backend
    const updatedProfile = {
      name,
      email,
      password,
    };

    axios.post('/api/user/profile', updatedProfile)
      .then(response => {
        alert('Changes saved!');
      })
      .catch(error => console.error('Error saving changes:', error));
  };

  return (
    <div className="profile-page">
      <div className="breadcrumb">
        <a href="/">Home</a> &gt; <span>Profile</span>
      </div>
      <h2>Profile</h2>
      <div className="profile-form">
        <div className="photo-section">
          <img src={photo || 'default-avatar.png'} alt="Profile" className="profile-photo" />
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
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Repeat Password</label>
            <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
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
