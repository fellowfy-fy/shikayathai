import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Profile() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>Profile Page!</div>
      <div className="d-flex ms-auto">
        {" "}
        {/* This will push the Profile to the right */}
        
        <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
      </div>
    </div>
  );
}

export default Profile;
