import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import Brands from "./pages/Brands";
import Complaints from "./pages/Complaints";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import Profile from "./pages/Profile";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/register" element={<Register />} />
        <Route path="profile/login" element={<Login />} />
        <Route path="brands" element={<Brands />} />
        <Route path="complaints" element={<Complaints />} />
      </Route>
    </Routes>
  );
}

export default App;
