import api from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.post('/api/refresh/', {
            withCredentials: true
        });
        console.log(response, "REfresSH")
        setAuth({
                accessToken: response.data.access,
                name: response.data.name,
                email: response.data.email,
                userpic: `data:image/png;base64,${response.data.userpic}`
            });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
