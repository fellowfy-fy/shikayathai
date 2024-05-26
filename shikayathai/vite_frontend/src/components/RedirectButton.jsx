import React from "react";
import { useNavigate } from "react-router-dom";

function RedirectButton({ method }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (method !== "login") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <button onClick={handleClick}>
      {method !== "login" ? "Go to Login" : "Go to Register"}
    </button>
  );
}

export default RedirectButton;
