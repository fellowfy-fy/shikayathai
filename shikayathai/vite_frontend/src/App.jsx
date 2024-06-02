import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Brands from './pages/Brands';
import Complaints from './pages/Complaints';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Register from './components/Register';
import Login from './components/Login';
import ModalComponent from './components/ModalComponent';

function App() {
  return (
    <>
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
      <ModalComponent />
    </>
  );
}

export default App;
