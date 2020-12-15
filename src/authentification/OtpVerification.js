import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {useAuth} from "../UserContext";
import axios from "axios";

export default function OtpVerification(props){

    const auth = useAuth();
    const [code, setCode] = useState('');

    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();

    const verifyUser = (e) =>{
        e.preventDefault();

        let bodyFormData = new FormData();
        bodyFormData.append('username', props.email);
        bodyFormData.append('password', props.password);
        bodyFormData.append('totp_token', code);
        axios.post('http://localhost:8000/token', bodyFormData)
            .then(response => {
                if(response.data.access_token !== null){
                    localStorage.setItem('user_token', response.data.access_token);
                    window.location.reload(false)
                }
            })
            .catch(error => {
                console.log(error.response)
            });
        console.log("verifyUser")
        //auth.signin(props.email, props.password);
    };

    const ShowQRCode = () =>{
        if(props.type === "register" && props.urlQRCode !== ''){
            return (
                <QRCode value={props.urlQRCode} className={"mt-5"}></QRCode>
            );
        }else{
            return <></>
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <ShowQRCode/>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={verifyUser}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="code"
                            label="Please enter the code from your authentication app"
                            type="text"
                            id="code"
                            onChange={(e) => setCode(e.currentTarget.value || null)}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={verifyUser}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    );
}

