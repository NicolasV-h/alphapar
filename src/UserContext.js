// Hook (use-auth.js)
import React, {useState, useEffect, useContext, createContext} from "react";
import axios from "axios";


const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth(props) {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (email, password) => {
        const user = {
            email,
            password
        };
        /*axios.post('/api/users/login',
            user)
            .then(response => {
                localStorage.setItem('user_token', response.data.access_token);
                if (localStorage.user_token) {
                    setUser(response.data.user);
                }
            })*/
        localStorage.setItem('user_token', "CESTUNGIGATOKEN");
        setUser({email})
        return true;
    };



    const signup = (email, password) => {
        return axios.post("/api/users/register", {
            email,
            password
        })
            .then(response => {
            localStorage.setItem('user_token', response.data.access_token);
            if (localStorage.user_token) {
                setUser(response.data.user);
            }
        })
    };

    const signout = (e) => {
        localStorage.removeItem('user_token');
        console.log(localStorage.getItem("user_token"))
        setUser(false);
        window.location.reload(false)
    };

    useEffect(() => {
        if(localStorage.user_token){
            setUser({"email": "skuuu"});
            /*
            axios.get(axios.defaults.baseURL + 'api/users',
                localStorage.user_token)
                .then(response => {
                    if (response.data) {
                        setUser(response.data);
                    } else {
                        setUser(false);
                    }
                });*/
        }
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        setUser
    };
}
