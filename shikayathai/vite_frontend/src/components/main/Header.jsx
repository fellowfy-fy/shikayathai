import { useContext } from "react";
import { BRAND_NAME } from "../../constants";
import "../../styles/Header.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

function Header() {
  const { auth } = useContext(AuthContext);
  console.log(auth.username)

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />{" "}
          {/* Adjust size as needed */}
          {BRAND_NAME}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/complaints">
                All complaints
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">
                All brands
              </Link>
            </li>
          </ul>
          <div className="d-flex ms-auto">
            {" "}
            {/* This will push the Profile to the right */}
            {auth.username ? (
              <Link to="/profile" className="btn btn-outline-light">
                {auth.username}
              </Link>
            ) : (
              <Link to="/profile" className="btn btn-outline-light">
                Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
