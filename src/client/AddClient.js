import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validateAddClient from "./validate/validateAddClient";
import axios from "axios";

export default function AddClient() {

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

    const onSubmit = () => {
        const client ={
            "name": values.clientName,
            "email": values.clientEmail,
            "address": values.clientAddress,
            "phone": values.clientPhone
        };

        axios.post('/client', client)
            .then(response => {
                if (response.data !== null) {
                    window.location.reload(false)
                }
            })
            .catch(error => {
                alert(error)
            });
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(onSubmit, validateAddClient);


    return (
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
                            id="clientPhone"
                            label="Numéro de téléphone"
                            name="clientPhone"
                            autoComplete="clientPhone"
                            autoFocus
                            type={"name"}
                            onChange={handleChange}
                            value={values.clientPhone || ''}
                        />
                        {errors.clientPhone && (
                            <p className="help is-danger">{errors.clientPhone}</p>
                        )}
                    </div>
                    <div className="control">
                        <TextField
                            className={`input`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="clientEmail"
                            label="Adresse Email"
                            name="clientEmail"
                            autoComplete="clientEmail"
                            type={"name"}
                            onChange={handleChange}
                            value={values.clientEmail || ''}
                        />
                        {errors.clientEmail && (
                            <p className="help is-danger">{errors.clientEmail}</p>
                        )}
                    </div>
                    <div className="control">
                        <TextField
                            className={`input`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="clientAddress"
                            label="Adresse"
                            name="clientAddress"
                            autoComplete="clientAddress"
                            type={"name"}
                            onChange={handleChange}
                            value={values.clientAddress || ''}
                        />
                        {errors.clientAddress && (
                            <p className="help is-danger">{errors.clientAddress}</p>
                        )}
                    </div>
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
