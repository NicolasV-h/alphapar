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
    const [type, setType] = useState('');
    const [urlQRCode, setUrlQRCode] = useState('');

    useEffect(() => {
        if (isIdentified) {
            history.push('/authentification/OtpVerification')
        }
    }, [isIdentified]);
    return (
        <>
            <Switch>
                <Route path={'/authentification'} exact>
                    <Login setIsIdentified={setIsIdentified} setEmail={setEmail} setPassword={setPassword} setType={setType}/>
                </Route>
                <Route path={"/authentification/OtpVerification"}>
                    <OtpVerification setIsLoggedIn={setIsLoggedIn} password={password} email={email} type={type} urlQRCode={urlQRCode}/>
                </Route>
                <Route path={"/authentification/register"}>
                    <Register setType={setType} setIsIdentified={setIsIdentified} setUrlQRCode={setUrlQRCode} setPassword={setPassword} setEmail={setEmail}/>
                </Route>
            </Switch>
        </>
    );
}

