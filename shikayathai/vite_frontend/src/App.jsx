import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import Main from "./pages/Main.jsx";
import Brands from "./pages/AllBrands/Brands.jsx";
import Complaints from "./pages/AllComplaints/Complaints.jsx";
import Layout from "./Layout.jsx";
import Profile from "./pages/ProfilePage/Profile.jsx";
import ModalComponent from "./components/ModalComponent.jsx";
import ComplaintPage from "./pages/ComplaintPage/ComplaintPage.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import UsersComplaints from "./pages/UsersComplaints.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Main />} />
            <Route path="profile" element={<UsersComplaints />} />
            <Route path="profile/edit" element={<Profile />} />
            <Route path="brands" element={<Brands />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="/complaints/:id" element={<ComplaintPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ModalComponent />
    </>
  );
}

export default App;
