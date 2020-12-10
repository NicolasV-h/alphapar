import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {useState} from 'react';
import useForm from "../assets/useForm";
import validate from '../assets/LoginFormValidationRules';
import {useAuth} from '../UserContext';

function Login(props) {
    const auth = useAuth();

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

        /*axios.post('/api/users/login',
            user)
            .then(response => {
                localStorage.setItem('user_token', response.data.access_token);
                if (localStorage.user_token) {
                    setUser(response.data.user);
                }
            })*/
        props.setEmail(values.email);
        props.setPassword(values.password);
        props.setIsIdentified(true)
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
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
