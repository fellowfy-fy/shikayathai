import React, { useState, useRef, useEffect } from 'react';
import { useModal } from '../../context/ModalContext';
import api from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = '/api/login/';

const LoginComponent = () => {
  const { hideModal } = useModal();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();
  const [persist, setPersist] = useState(false);

  useEffect(() => {
    errRef.current?.focus();
  }, [errMsg]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(LOGIN_URL, JSON.stringify({ email, password, persist }), {
        headers: { 'Content-Type': 'application/json' }
      });
      const { name, access, userpic } = response.data;
      setAuth({ name, email, access, userpic });
      setEmail('');
      setPassword('');
      hideModal();
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/accounts/github/login/';
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="modal-header flex justify-between items-center pb-3">
          <h5 className="modal-title text-xl font-bold">Login</h5>
          <button onClick={hideModal} className="text-lg font-semibold">×</button>
        </div>
        <div className="modal-body">
          {errMsg && <p ref={errRef} className="alert alert-danger" tabIndex={-1}>{errMsg}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label className="form-check-label" htmlFor="persist">Trust This Device</label>
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#001A45] bg-[#C9FF57] hover:bg-[#B5F62B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Login
          </button>
          </form>
          <button onClick={handleGitHubLogin} className="btn btn-secondary mt-3 w-full">
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
