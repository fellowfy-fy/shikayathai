import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import api from "../api/axios";
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const access = await refresh();
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${access}` },
        });
        const name = response.data.name;
        const email = response.data.email;
        const userpic = response.data.userpic;
        setAuth({ name, email, userpic, access });
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.access && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  // console.log(`isLoading: ${isLoading}`)
  // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
  // }, [isLoading])

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
