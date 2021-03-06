import React, {useState, useEffect, useContext, createContext} from "react";

import axios from "axios";

const authContext = createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth(props) {
    const [user, setUser] = useState(null);

    const signin = (token) => {
        localStorage.setItem('user_token', token);

        return true;
    };



    const signup = (email, password) => {
        return axios.post("/api/users/register", {
            email,
            password
        })
            .then(response => {
            localStorage.setItem('user_token', response.data.access_token);
        })
    };

    const signout = (e) => {
        localStorage.removeItem('user_token');
        window.location.reload(false)
    };


    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        setUser
    };
}
