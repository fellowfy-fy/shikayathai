import { Navigate } from "react-router-dom";
import api from "./api/axios";
import { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";


function ProtectedRoute({ children }) {
    const { auth } = useAuth();

    return auth.access ? children : <Navigate to="/" />;
}

export default ProtectedRoute;