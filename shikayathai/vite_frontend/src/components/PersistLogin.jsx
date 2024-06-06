import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import api from "../api/axios";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
                const res = await api.get("api/users/profile/", {
                    'Authorization': `Bearer ${auth.accessToken}`
                })
                console.log(res)
                const email = res?.data?.email;
                const password = res?.data?.password;
                const response = await api.post(
                    "api/login/",
                    JSON.stringify({ email, password }),
                    {
                      headers: { "Content-Type": "application/json" },
                      withCredentials: true
                    }
                )
                const accessToken = response?.data?.access;
                const name = response?.data?.name;
                const userpic = `data:image/png;base64,${response.data.userpic}`;
                setAuth({ name, email, password, accessToken, userpic });
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin