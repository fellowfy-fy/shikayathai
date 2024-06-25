import { useState, useRef, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import api from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import facebookIcon from "../../assets/ico-fb.svg";
import googleIcon from "../../assets/ico-g.svg";
import linkedinIcon from "../../assets/ico-li.svg";
import close from "../../assets/close.svg";
import RegistrationComponent from "../RegistrationComponent/RegistrationComponent.jsx";

const LOGIN_URL = "/login/";

const LoginComponent = () => {
  const { hideModal, showModal, setIsVisible } = useModal();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [persist, setPersist] = useState(true);

  useEffect(() => {
    errRef.current?.focus();
  }, [errMsg]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({ email, password, persist }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { name, access, userpic } = response.data;
      localStorage.setItem("refresh_token", response.data.refresh);
      setAuth({ name, email, access, userpic });
      setEmail("");
      setPassword("");
      hideModal();
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Wrong email or password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  const handleRegistrationClick = () => {
    showModal(<RegistrationComponent />);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-20">
      <div className="bg-white px-[24px] w-[800px] h-[513px] rounded-[32px] shadow-xl">
        <div className="modal-header flex justify-between items-center pb-3">
          <h5 className="modal-title mt-[76px] text-[#001A45] text-[32px] font-inter font-bold">
            Log in to your account
          </h5>
          {errMsg && (
            <p ref={errRef} className="alert alert-danger" tabIndex={-1}>
              {errMsg}
            </p>
          )}
          <button onClick={hideModal} className="text-lg font-semibold">
            <img src={close}></img>
          </button>
        </div>
        <p className="text-[16px] text-[#001A45] font-inter font-medium">
          To create complaints and track their status
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="email"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="john@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="name"
                className="block text-[#001A45] text-[24px] font-inter font-bold"
              >
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border h-[44px] border-[#001A45] rounded-[12px] border-opacity-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hover:border-[#0450CF] placeholder-opacity-30"
                placeholder="Enter Your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full h-[55px] justify-center rounded-[12px] text-[18px] font-medium text-[#001A45] hover:bg-[#C9FF57] bg-[#B5F62B] active:bg-[#A9E922]"
          >
            Login
          </button>
        </form>
        <div>
          <label className="block mt-[20px] text-[24px] font-inter font-bold text-[#001A45]">
            Or log in via social media
          </label>
          <div className="flex gap-3 mt-[16px]">
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
            onClick={handleRegistrationClick}
            className="mt-[20px] font-inter font-bold text-[18px] text-[#0450CF] hover:text-[#0450CF] hover:underline"
          >
            Don't have an account yet? Complete the registration process
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
