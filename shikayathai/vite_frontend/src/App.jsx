import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Brands from "./pages/Brands";
import Complaints from "./pages/Complaints";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import ModalComponent from "./components/ModalComponent";
import PersistLogin from "./components/PersistLogin";
import ComplaintPage from "./pages/ComplaintPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Main />} />
            <Route path="profile" element={<Profile />} />
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
