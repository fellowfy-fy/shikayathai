import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersComplaints = () => {
  const [user, setUser] = useState({
    name: "Annet",
    email: "example@gmail.com",
    photoUrl: "path_to_some_photo_url" // Ensure you have a valid URL or local path here.
  });
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/complaints/list/")
      .then(response => setComplaints(response.data))
      .catch(error => console.error("Error fetching complaints:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mt-4">
        <img src={user.photoUrl} alt="User" className="w-24 h-24 rounded-full mx-auto"/>
        <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
        <p className="text-md text-gray-500">{user.email}</p>
        <button className="mt-2 text-blue-600 hover:text-blue-800">edit profile</button>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">My complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {complaints.map(complaint => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
};

export default UsersComplaints;
