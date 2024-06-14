import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import api from "../../api/axios";
import "./Profile.css";
import signOutIcon from "../../assets/sign-out-icon.svg"; // Ensure this path is correct
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
      .get("/api/profile", {
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
      const response = await api.delete("/api/delete/",  {
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
      .put("/api/profile/", updatedProfile, {
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
    <div className="max-w-5xl mx-auto p-8">
    <div className="text-lg text-[#001A45] mb-4">
      <a href="/" className="text-[#001A45] hover:underline">Home</a> &gt; <span>Profile</span>
    </div>
    <h2 className="text-2xl font-bold text-[#001A45] mb-4">Profile</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img src={photoPreview || auth.userpic} alt="Profile" className="rounded-full w-24 h-24 object-cover mb-4" />
        <div>
          <label htmlFor="photo-upload" className="block text-sm font-medium text-[#001A45] cursor-pointer mb-2">Choose a photo</label>
          <input type="file" id="photo-upload" onChange={handlePhotoChange} className="block w-full text-sm text-[#001A45] p-2 border border-[#001A45] rounded" />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-bold text-[#001A45]">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div>
          <label className="block font-bold text-[#001A45]">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div>
          <label className="block font-bold text-[#001A45]">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <div>
          <label className="block font-bold text-[#001A45]">Repeat Password</label>
          <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} className="w-full p-2 border border-[#001A45] rounded" />
        </div>
        <button onClick={handleSaveChanges} className="bg-[#B5F62B] hover:bg-[#A9E922] text-[#001A45] px-4 py-2 rounded font-bold mt-4">Save changes</button>
      </div>
    </div>
    <div className="flex justify-end space-x-4 mt-8">
      <button onClick={deleteUser} className="text-red-500 hover:text-red-700">Delete Account</button>
      <button onClick={signOut} className="bg-[#001A45] text-white px-4 py-2 rounded hover:bg-[#002244]">Sign Out</button>
    </div>
  </div>
  );
}

export default Profile;
