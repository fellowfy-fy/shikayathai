import React from 'react';
import { useModal } from '../../context/ModalContext';
import RegistrationComponent from './RegistrationComponent';
import LoginComponent from './LoginComponent';
import "../../styles/HeaderFooter.css";

const Header = () => {
  const { showModal } = useModal();

  const handleRegisterClick = () => {
    showModal(<RegistrationComponent />);
  };

  const handleLoginClick = () => {
    showModal(<LoginComponent />);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Shikayathai</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/brands">All rands</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/complaints">All Complaints</a>
              </li>
            </ul>
            <div className="d-flex">
              <button onClick={handleRegisterClick} className="btn btn-primary me-2">Register</button>
              <button onClick={handleLoginClick} className="btn btn-secondary">Login</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
