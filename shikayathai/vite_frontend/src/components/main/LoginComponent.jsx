import { useModal } from '../../context/ModalContext';
import api from '../../api/axios';
import  { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import {  useNavigate, useLocation } from 'react-router-dom';

const LOGIN_URL = 'api/login/';

const LoginComponent = () => {
  
  const { hideModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [errMsg, setErrMsg] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await api.post(LOGIN_URL,
            JSON.stringify({ email, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                // withCredentials: true
            }
        );
        const accessToken = response?.data?.access;
        const name = response?.data?.name
        const userpic = `data:image/png;base64,${response.data.userpic}`
        setAuth({ name, email, password, accessToken, userpic });
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
        errRef.current.focus();
    }
}

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title">Login</h5>
        <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
