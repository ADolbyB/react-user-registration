import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    
    useEffect(() => { // Interceptors to handle the JWT Tokens
        
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"]) { // If auth header does not exist: 1st attempt / not a retry
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error) // Handle error with anonymous function
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response, // If all goes well, return the response
            async (error) =>  { // Otherwise...your token has expired, etc...
                const prevRequest = error?.config; // optional chaining just in case config does not exist
                if (error?.response?.status === 403 && !prevRequest?.sent) { // Avoid inf loop of 403s
                    prevRequest.sent = true; // If Forbidden && "sent" does not exist: only retry once
                    const newAccessToken = await refresh(); // call refresh function on the server
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Set token
                    return axiosPrivate(prevRequest); // return updated request with new access token
                }
                return Promise.reject(error); // Else: return the error
            }
        ); // Interceptors can pile on if we don't remove them

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept); // Remove when cleanup runs
            axiosPrivate.interceptors.response.eject(responseIntercept); // Remove when cleanup runs
        }

    }, [auth, refresh]) // Pass these to the dependency array

    return axiosPrivate; // useAxiosPrivate hook returns the axiosPrivate instance
}

export default useAxiosPrivate;