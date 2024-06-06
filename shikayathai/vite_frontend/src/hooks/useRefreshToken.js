import api from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.post('/api/refresh/', {
            withCredentials: true
        });
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.access);
            return {
                ...prev,
                accessToken: response.data.access
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
