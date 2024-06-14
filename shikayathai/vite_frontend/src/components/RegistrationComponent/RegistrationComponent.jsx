import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import api from '../../api/axios';

const RegistrationComponent = () => {
  const { hideModal } = useModal();
  const [userData, setUserData] = useState({ name: '', email: '', password: '', repassword: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.password !== userData.repassword) {
      setError("Passwords must match.");
      return;
    }
    try {
      const response = await api.post('/api/register/', {
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      hideModal();
      alert("Registration successful!");
      console.log(response.data); // Logging the response is optional
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="modal-header flex justify-between items-center pb-3">
          <h5 className="modal-title text-xl font-bold">Create an account</h5>
          <button onClick={hideModal} className="text-lg font-semibold">×</button>
        </div>
        {error && <p className="text-red-500 text-sm p-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">Repeat Password</label>
            <input
              type="password"
              name="repassword"
              id="repassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={userData.repassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#001A45] bg-[#C9FF57] hover:bg-[#B5F62B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationComponent;
