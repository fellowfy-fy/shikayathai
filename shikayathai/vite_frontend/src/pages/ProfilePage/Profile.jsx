import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import api from "../../api/axios";
import "./Profile.css";
import signouticon from "../../assets/signouticon.svg"; 
import useAuth from "../../hooks/useAuth";

function Profile() {
  const navigate = useNavigate();
  const logout = useLogout();
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null); // State for photo preview

  useEffect(() => {
    if (!auth?.access) {
      navigate("/");
    }
    api
      .get("/profile", {
        headers: { Authorization: `Bearer ${auth.access}` },
      })
      .then((response) => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoto(response.data.photo);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [auth.access, navigate]);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const deleteUser = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmation) return;
    try {
      console.log(auth.access)
      const response = await api.delete("/delete/",  {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });
      setAuth({});
      console.log(response);
    } catch (err) {
      console.error(err);
    }
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
      alert("Passwords do not match!");
      return;
    }

    const updatedProfile = new FormData();
    updatedProfile.append("name", name);
    updatedProfile.append("email", email);
    if (password !== "") {
      updatedProfile.append("password", password);
    }
    if (photo && photo instanceof File) {
      updatedProfile.append("userpic", photo);
    }

    api
      .put("/profile/", updatedProfile, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.access}`,
        },
      })
      .then((response) => {
        alert("Changes saved!");
        const userpic = response?.data?.userpic;
        console.log(response.data);
        setAuth((prev) => ({ ...prev, name, email, userpic }));
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
        // if (error.response && error.response.status === 401) {
        //   navigate('/login'); // Redirect to login if not authorized
        // }
      });
  };

  return (
  <div className="max-w-auto mx-auto p-8 relative">
    <div className="absolute top-8 right-8">
    <button onClick={signOut} className="bg-transparent border-none p-0 hover:bg-transparent focus:outline-none">
          <img src={signouticon} alt="Sign Out" className="inline"/>
        </button>
    </div>
    <div className="text-lg text-[#001A45] mb-4">
      <a href="/" className="text-[#001A45] hover:underline">Home</a> &gt; <span>Profile</span>
    </div>
    <h2 className="text-2xl font-bold text-[#001A45] mb-4">Profile</h2>
    <div className="flex flex-col items-start w-full">
    <div className="flex items-center w-full mb-4">
     <img src={photoPreview || auth.userpic} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
     <input type="file" id="photo-upload" onChange={handlePhotoChange} className="ml-2 block text-sm text-[#001A45] p-2 border border-[#001A45] rounded hidden" />
      <button 
       className="bg-[#001A45] text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700 ml-2"
       onClick={() => document.getElementById('photo-upload').click()}>
       Choose a photo
     </button>
    </div>
      <div className="flex justify-between w-full">
        <div className="w-full mr-2">
        <label className="block font-bold text-[#001A45]">Name</label>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div className="w-full mr-2">
          <label className="block font-bold text-[#001A45]">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div className="w-full mr-2">
          <label className="block font-bold text-[#001A45]">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div className="w-full">
          <label className="block font-bold text-[#001A45]">Repeat Password</label>
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
      </div>
      <button onClick={handleSaveChanges} className="bg-[#B5F62B] hover:bg-[#A9E922] text-[#001A45] px-4 py-2 rounded font-bold w-full mt-4">Save changes</button>
      <button onClick={deleteUser} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font-bold w-full mt-4">Delete Account</button>
    </div>
  </div>
);

    
}

export default Profile;


