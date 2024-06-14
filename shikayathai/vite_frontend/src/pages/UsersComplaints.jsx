import React, { useState, useEffect } from "react";
import api from "../api/axios";
import FrameComponent from "../components/FrameComponent/FrameComponent";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const UsersComplaints = () => {
  const {auth} = useAuth()
  const [user, setUser] = useState({
    name: auth.name,
    email: auth.email,
    photoUrl: auth.userpic // Ensure you have a valid URL or local path here.
  });
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api.get("/complaints/list/author/", {headers:{
      Authorization: `Bearer ${auth.access}`,
    }})
      .then(response => setComplaints(response.data.results))
      .catch(error => console.error("Error fetching complaints:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mt-4">
        <img src={user.photoUrl} alt="User" className="w-24 h-24 rounded-full mx-auto"/>
        <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
        <p className="text-md text-gray-500">{user.email}</p>
        <Link className="mt-2 text-blue-600 hover:text-blue-800" to="edit">edit profile</Link>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">My complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {complaints.map(complaint => (
          <FrameComponent key={complaint.id} data={complaint} />
        ))}
      </div>
    </div>
  );
};

export default UsersComplaints;
