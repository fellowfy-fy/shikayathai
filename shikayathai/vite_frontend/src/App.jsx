import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Brands from './pages/Brands';
import Complaints from './pages/Complaints';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import ModalComponent from './components/ModalComponent';
import ComplaintPage from './pages/ComplaintPage';
import './styles/Main/Base.css';
import './styles/Main/Responsive.css';
import './styles/Main/Utilities.css'; // Assuming Utilities.css is used globally


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<NotFound />} />
          <Route path="profile" element={<Profile />} />
          <Route path="brands" element={<Brands />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="/complaints/:id" element={<ComplaintPage />} />
        </Route>
      </Routes>
      <ModalComponent />
    </>
  );
}

export default App;
