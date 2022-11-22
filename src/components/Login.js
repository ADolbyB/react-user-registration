import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = "./auth";

const Login = () => {
    const { setAuth } = useContext(AuthContext); // Sucessful Authentication will be stored in global context
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false); // Only need for Development

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
                JSON.stringify({ user, pwd }),
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
            setSuccess(true);
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

    return (
        <>
            {success ? (
                <section>
                    <h1>You Are Logged In!</h1>
                    <br />
                    <p>
                        <a href="#">Go To Home Page</a>
                    </p>
                </section>
            ) : (
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
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            { /* Put Router Link Here */ }
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login