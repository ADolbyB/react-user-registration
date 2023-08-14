import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom"

import axios from "../api/axios";
const LOGIN_URL = "./auth";

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth(); // Successful Authentication will be stored in global context
    
    const navigate = useNavigate();
    const location = useLocation(); // Find where user came from (which page?)
    const from = location.state?.from?.pathname || "/";
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    //const [success, setSuccess] = useState(false); // Only for Development

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg(""); // Clear Error Messages when user starts retyping
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent Page Reload on submit
        console.log(user, pwd); // DEBUG
        
        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({ user, pwd }), // prints to console after login
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true
                }
            ); // Note that axios will automatically throw an error
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response)) // May be a large output
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser(""); // Clear Input Fields
            setPwd("");
            navigate(from, { replace: true }); // Use React Router to navigate to proper page
        } catch (err) {
            if(!err?.response) {
                setErrMsg("SERVER NOT RESPONDING");
            } else if (err.response?.status === 400) { // 400: Bad Request
                setErrMsg("Missing Username Or Password")
            } else if (err.response?.status === 401) { // 401: Unauthorized
                setErrMsg("Invalid Login Credentials")
            } else {
                setErrMsg("Login Failed: Call Tech Support");
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
                <div className="persistCheck">
                    <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <a href="/register">Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default Login
