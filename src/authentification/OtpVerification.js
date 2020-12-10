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

    const verifyUser = () =>{
        auth.signin(props.email, props.password);
    };

    const ShowQRCode = () =>{
        console.log(props.type)
        if(props.type === "register"){
            return (
                <QRCode value="otpauth://totp/Alphapar:jul%40lesang.fr?secret=IL5JIXNKISNWSICU&issuer=Alphapar" className={"mt-5"}></QRCode>
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
                    <form className={classes.form} noValidate>
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

