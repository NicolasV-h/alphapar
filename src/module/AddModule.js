import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validateAddModule from "./validate/validateAddModule";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

export default function AddModule(props) {

    const [piecesNumber, setPiecesNumber] = useState(1);
    const [modulePieceQuantity, setModulePieceQuantity] = useState([1]);
    const [modulePieceName, setModulePieceName] = useState(['']);
    const children = [];
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

    const handleChangeQuantity = (e, i) => {
        setModulePieceQuantity(
            modulePieceQuantity.map((item, index) => (
                index === i - 1 ? e.target.value : item
            ))
        )
    };

    const handleChangeName = (e, i) => {
        setModulePieceName(
            modulePieceName.map((item, index) => (
                index === i - 1 ? e.target.value : item
            ))
        )
    };

    const onSubmit = () => {
        const plans = {
            "name": values.planName,
            "pieces": []
        };
        modulePieceName.map((item, i) => {
            plans.pieces.push({'piece_id': item, 'quantity': parseInt(modulePieceQuantity[i])});
        });

        axios.post('http://localhost:8000/plan', plans)
            .then(response => {
                if (response.data !== null) {
                    window.location.reload(false)
                }
            })
            .catch(error => {
                alert(error)
            });
    };

    const removePiece = (i) =>{
        setPiecesNumber(piecesNumber - 1);
        setModulePieceQuantity(modulePieceQuantity => modulePieceQuantity.filter((quantity, index) => i !== index));
        setModulePieceName(modulePieceName => modulePieceName.filter((name, index) => i !== index));
    };

    const ButtonAddPiece = ({i}) => {
        if (piecesNumber === i) {
            return (
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={"small-button px-2"}
                    onClick={() => {
                        setPiecesNumber(piecesNumber + 1);
                        setModulePieceName(modulePieceName => [...modulePieceName, '']);
                        setModulePieceQuantity(modulePieceQuantity => [...modulePieceQuantity, 1]);
                    }}
                >
                    +
                </Button>
            );
        } else {
            return (
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={"small-button red px-2"}
                    onClick={() => removePiece(i)}
                >
                    -
                </Button>

            );
        }
    };

    const ContainerAddPiece = () => {

        for (let i = 1; i < piecesNumber + 1; i++) {
            children.push(
                <div className="control d-flex justify-content-between align-items-center" key={['piecesNumber', i].join('_')}>
                    <FormControl className={classes.formControl + ' w-100'}>
                        <InputLabel id="demo-simple-select-label">Choisissez une pièce</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id={"modulePieceName" + i}
                            value={modulePieceName[i - 1] || ''}
                            onChange={(e) => handleChangeName(e, i)}
                            name={"modulePieceName" + i}
                            type={"name"}
                        >
                            {props.pieces.map(piece => {
                                return (
                                    <MenuItem value={piece.id} key={'piece' + piece.name}>{piece.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    <div
                        className={classes.formControl + ' w-100 px-5 d-flex justify-content-center align-items-center'}>
                        <TextField
                            className={`input px-2`}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id={"modulePieceQuantity" + i}
                            label="Quantité"
                            name={"modulePieceQuantity" + i}
                            type={"text"}
                            onChange={(e) => handleChangeQuantity(e, i)}
                            value={modulePieceQuantity[i - 1] || ''}
                        />
                    </div>
                    <ButtonAddPiece i={i}/>
                </div>
            );
        }

        return children;
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(onSubmit, validateAddModule);


    return (
        <Container component="main" maxWidth="sm" className={"add-client"}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <div className="control">
                    <TextField
                        className={`input`}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="planName"
                        label="Nom du module"
                        name="planName"
                        autoComplete="planName"
                        autoFocus
                        type={"name"}
                        onChange={handleChange}
                        value={values.planName || ''}
                    />
                    {errors.planName && (
                        <p className="help is-danger">{errors.planName}</p>
                    )}
                </div>
                <ContainerAddPiece/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Ajouter le module
                </Button>
            </form>
        </Container>
    );
}
