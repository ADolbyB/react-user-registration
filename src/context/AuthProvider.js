import { createContext, useState } from "react";

const AuthContext = createContext({}); // contains empty object

export const AuthProvider = ({ children }) => { // Children represents the components inside AuthProvider
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;