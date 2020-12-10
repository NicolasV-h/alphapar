import React, {useState, useEffect} from "react";
import Login from "./Login";
import {Route, useLocation, useHistory, Switch} from 'react-router-dom';
import OtpVerification from "./OtpVerification";
import Register from "./Register";

export default function Authentification(props) {
    const [isIdentified, setIsIdentified] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isIdentified) {
            history.push('/authentification/OtpVerification')
        }
    }, [isIdentified]);
    return (
        <>
            <Switch>
                <Route path={'/authentification'} exact>
                    <Login setIsIdentified={setIsIdentified} setEmail={setEmail} setPassword={setPassword}/>
                </Route>
                <Route path={"/authentification/OtpVerification"}>
                    <OtpVerification setIsLoggedIn={setIsLoggedIn} password={password} email={email}/>
                </Route>
                <Route path={"/authentification/register"}>
                    <Register/>
                </Route>
            </Switch>
        </>
    );
}

