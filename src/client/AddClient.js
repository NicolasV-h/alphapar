import React, {useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validate from "../assets/LoginFormValidationRules";

export default function AddClient(){

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

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(null, validate);


    return(
        <Container component="main" maxWidth="xs" className={"add-client"}>
            <CssBaseline/>
            <div>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <div className="control">
                        <TextField
                            className={`input`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="clientName"
                            label="Nom entreprise"
                            name="clientName"
                            autoComplete="clientName"
                            autoFocus
                            type={"name"}
                            onChange={handleChange}
                            value={values.clientName || ''}
                        />
                        {errors.clientName && (
                            <p className="help is-danger">{errors.clientName}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ajouter le client
                    </Button>
                </form>
            </div>
        </Container>
    );
}
