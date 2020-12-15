import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import React, {useState} from 'react';
import useForm from "../assets/useForm";
import validate from '../assets/LoginFormValidationRules';
import {useAuth} from '../UserContext';
import {useHistory} from "react-router-dom";

function Login(props) {
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


    const verifyCredentials = () => {

        let bodyFormData = new FormData();
        bodyFormData.append('username', values.email);
        bodyFormData.append('password', values.password);
        bodyFormData.append('totp_token', code);
        axios.post('http://localhost:8000/token', bodyFormData)
            .then(response => {
                if(response.data.access_token !== null){
                    auth.signin(response.data.access_token);
                    window.location.reload(false);
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm(verifyCredentials, validate);

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <div className="control">
                        <TextField
                            className={`input ${errors.email && 'is-danger'}`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type={"email"}
                            onChange={handleChange}
                            value={values.email || ''}
                        />
                        {errors.email && (
                            <p className="help is-danger">{errors.email}</p>
                        )}
                    </div>
                    <div className="control">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={values.password || ''}
                        />
                        {errors.password && (
                            <p className="help is-danger">{errors.password}</p>
                        )}
                    </div>
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
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;
