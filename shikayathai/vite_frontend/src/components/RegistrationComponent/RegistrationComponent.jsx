import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import api from '../../api/axios';
import facebookIcon from '../../assets/ico-fb.svg'; 
import googleIcon from '../../assets/ico-g.svg'; 
import linkedinIcon from '../../assets/ico-li.svg';
import close from '../../assets/close.svg';
import InfoComponent from "../pop-ups/InfoComponent";

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
      console.log(response.data); 
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleInfoClick = () => {
    setIsVisible(false);
    showModal(<InfoComponent />);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white px-[24px] w-[800px] h-[610px] rounded-[32px] shadow-xl">
        <div className="modal-header flex justify-between items-center pb-3">
          <h5 className="modal-title mt-[76px] text-[#001A45] text-[32px] font-inter font-bold">Create an account</h5>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button onClick={hideModal} className="text-lg font-semibold"><img src={close}></img></button>
        </div>
        <p className="text-[16px] text-[#001A45] font-inter font-medium">
        To create complaints and track their status</p>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="name" className="block text-[#001A45] text-[24px] font-inter font-bold">Name</label>
              <input
                type="name"
                name="name"
                id="name"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="block text-[#001A45] text-[24px] font-inter font-bold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="password" className="block text-[#001A45] text-[24px] font-inter font-bold">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="repassword" className="block text-[#001A45] text-[24px] font-inter font-bold">Repeat Password</label>
              <input
                type="password"
                name="repassword"
                id="repassword"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.repassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full h-[55px] justify-center rounded-[12px] text-[18px] font-medium text-[#001A45] bg-[#C9FF57] hover:bg-[#B5F62B]">
            Create an account
          </button>
          <div>
            <label className="block mt-[20px] text-[24px] font-inter font-bold text-[#001A45]">Or registration via social media</label>
            <div className='flex gap-3 mt-[16px]'>
              <button className="w-[64px] h-[64px] bg-transparent">
              <img src={googleIcon} alt="Google" />
              </button>
              <button className="w-[64px] h-[64px] bg-transparent">
                <img src={facebookIcon} alt="Facebook" />
              </button>
              <button className="w-[64px] h-[64px] bg-transparent">
              <img src={linkedinIcon} alt="LinkedIn" />
              </button>
            </div>
            <button
              onClick={handleInfoClick}
              className="mt-[20px] font-inter font-bold text-[18px] text-[#0450CF] hover:text-[#0450CF] hover:underline">
              Already have an account?  Log in to it
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationComponent;
