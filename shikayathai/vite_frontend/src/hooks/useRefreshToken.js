import api from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refreshToken = localStorage.getItem("refresh_token");

  const refresh = async () => {
    const response = await api.post("/token/refresh/", {
      refresh: refreshToken,
    });
    setAuth({
      access: response.data.access,
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
