import { createContext, useState } from "react";

const AuthContext = createContext({}); // contains empty object

export const AuthProvider = ({ children }) => { // Children represents the components inside AuthProvider
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;