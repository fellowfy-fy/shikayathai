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
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex flex-wrap items-center justify-between">
        <Link className="flex items-center" to="/">
          <img src={logo} alt="Logo" className="w-6 mr-2" />
          <span className="font-semibold text-xl">Shikayahai</span>
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
        <div className="w-full lg:flex lg:items-center lg:w-auto hidden" id="navbarNav">
          <ul className="lg:flex lg:justify-between lg:flex-grow">
            <li className="mt-4 lg:mt-0">
              <Link className="block lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4" to="/">Home</Link>
            </li>
            <li className="mt-4 lg:mt-0">
              <Link className="block lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4" to="/brands">All brands</Link>
            </li>
            <li className="mt-4 lg:mt-0">
              <Link className="block lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4" to="/complaints">All Complaints</Link>
            </li>
          </ul>
          {!auth.name ? (
            <div className="mt-4 lg:mt-0 flex">
              <button onClick={handleRegisterClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Register
              </button>
              <button onClick={handleLoginClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            </div>
          ) : (
            <div className="mt-4 lg:mt-0 flex items-center">
              <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" to="/profile">
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
