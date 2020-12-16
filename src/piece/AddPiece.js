import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validateAddPiece from "./validate/validateAddPiece";
import axios from "axios";

export default function AddPiece(){

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
        const piece ={
            "name": values.pieceName,
            "price": values.piecePrice
        };

        axios.post('https://web.pierrehamel/piece', piece)
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
    } = useForm(onSubmit, validateAddPiece);


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
                            id="pieceName"
                            label="Nom pièce"
                            name="pieceName"
                            autoComplete="pieceName"
                            autoFocus
                            type={"name"}
                            onChange={handleChange}
                            value={values.pieceName || ''}
                        />
                        {errors.pieceName && (
                            <p className="help is-danger">{errors.pieceName}</p>
                        )}
                    </div>
                    <div className="control">
                        <TextField
                            className={`input`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="piecePrice"
                            label="Prix pièce"
                            name="piecePrice"
                            autoComplete="piecePrice"
                            type={"name"}
                            onChange={handleChange}
                            value={values.piecePrice || ''}
                        />
                        {errors.piecePrice && (
                            <p className="help is-danger">{errors.piecePrice}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Ajouter une pièce
                    </Button>
                </form>
            </div>
        </Container>
    );
}
