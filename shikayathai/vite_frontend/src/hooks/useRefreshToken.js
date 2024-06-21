import api from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.post('/token/refresh/', {
            withCredentials: true
        });
        setAuth({
                access: response.data.access,
            });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;
