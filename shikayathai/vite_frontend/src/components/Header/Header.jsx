import { useModal } from "../../context/ModalContext";
import RegistrationComponent from "../RegistrationComponent/RegistrationComponent.jsx";
import LoginComponent from "../LoginComponent/LoginComponent.jsx";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const { showModal } = useModal();

  const handleRegisterClick = () => {
    showModal(<RegistrationComponent />);
  };

  const handleLoginClick = () => {
    showModal(<LoginComponent />);
  };

  return (
    <header className="bg-[#001A45] text-white h-12 w-full flex items-center justify-center">
      <nav className="container mx-auto h-full flex items-center justify-between w-full">
        <Link className="flex items-center" to="/">
          <img src={logo} alt="Logo" className="w-6 mr-2" />
          <span className="font-unbounded font-bold text-xl">Shikayahai</span>
        </Link>
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={() => {
            document.getElementById("navbarNav").classList.toggle("hidden");
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <div className="hidden lg:flex lg:items-center lg:justify-center w-full" id="navbarNav">
          <ul className="flex justify-center items-center flex-grow">
            <li>
              <Link className="font-inter text-white hover:text-gray-400 mx-4" to="/">Home</Link>
            </li>
            <li>
              <Link className="font-inter text-white hover:text-gray-400 mx-4" to="/brands">All brands</Link>
            </li>
            <li>
              <Link className="font-inter text-white hover:text-gray-400 mx-4" to="/complaints">All Complaints</Link>
            </li>
          </ul>
          {!auth.name ? (
            <div className="flex">
              <button onClick={handleRegisterClick} className="bg-transparent hover:bg-transparent text-white font-inter py-2 px-4 rounded mx-2">
                Register
              </button>
              <button onClick={handleLoginClick} className="bg-transparent hover:bg-transparent text-white font-inter py-2 px-4 rounded">
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <Link className="bg-transparent text-white font-inter py-2 px-4 rounded mx-2" to="/profile">
                {auth.name}
              </Link>
              <img className="rounded-full w-8 h-8" src={auth.userpic} alt="User" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;