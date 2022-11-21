import { useRef, useState, useEffect } from "react"; // Import 3 hooks we will use:
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";

// Form validation:
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; // Username conditions
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // Password Conditions
const REGISTER_URL = "/register";

const Register = () => {
    const userRef = useRef(); // Set focus on user input when component loads
    const errRef = useRef(); // Errors can be announced for readability/accessibility

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => { // Set Focus when component loads
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If button enable via JS hack:
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        console.log(user, pwd);
        setSuccess(true);
    }


    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username: 
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide" }/>
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 Characters. <br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
                <label htmlFor="password">
                    Password: 
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 Character.<br />
                        Must Include Uppercase and lowercase letter, a number, and a special character<br />
                        Allowed Special Characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> 
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="hashtag">#</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password: 
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(false)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must Match the First Password Input Field.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                Already Registered?<br />
                <span className="line">
                    {/* put router link here */}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
            )}
            </>
    )
}

export default Register 

