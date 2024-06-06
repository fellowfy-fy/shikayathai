import useAuth from "./useAuth";
import api from "../api/axios"

const useLogout = () => {
    const { setAuth, auth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await api.post('/api/logout/', {
                withCredentials: true,
                Authorization: `Bearer ${auth.access}` 
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout