import { Outlet } from "react-router-dom";

import Header from "../components/main/Header";

import Footer from "../components/main/Footer";

const Layout = () => {
  return (
    <main className="App">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
