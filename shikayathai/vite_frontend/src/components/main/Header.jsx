import React from "react";
import { useModal } from "../../context/ModalContext";
import RegistrationComponent from "./RegistrationComponent";
import LoginComponent from "./LoginComponent";
import "../../styles/HeaderFooter.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const { showModal } = useModal();
  console.log(auth)

  const handleRegisterClick = () => {
    showModal(<RegistrationComponent />);
  };

  const handleLoginClick = () => {
    showModal(<LoginComponent />);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Shikayathai
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  All brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/complaints">
                  All Complaints
                </Link>
              </li>
            </ul>
            {!auth.name ? (
              <div className="d-flex">
                <button
                  onClick={handleRegisterClick}
                  className="btn btn-primary me-2"
                >
                  Register
                </button>
                <button
                  onClick={handleLoginClick}
                  className="btn btn-secondary"
                >
                  Login
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-primary me-2" to="/profile">
                  {auth.name}
                </Link>

                <img
                  className="navbar-brand rounded-circle"
                  src={auth.userpic}
                  width="30" height="40"
                ></img>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
