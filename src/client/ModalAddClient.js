import React, {useState} from "react";
import {Modal, Button} from "react-bootstrap"
import {makeStyles} from "@material-ui/core/styles";
import useForm from "../assets/useForm";
import validate from "../assets/LoginFormValidationRules";
import TextField from "@material-ui/core/TextField";

export default function ModalAddClient(props){

    const [numberPlan, setNumberPlan] = useState(1);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log();

        /*props.setShow(false);*/
    };

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

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(null, validate);

    const classes = useStyles();

    return(
        <Modal /*show={props.show}*/ /*onHide={props.setShow(false)}*/>
            <form noValidate onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="control">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Plan"
                            label="Plan"
                            type="text"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={values.password || ''}
                        />
                        {errors.password && (
                            <p className="help is-danger">{errors.password}</p>
                        )}
                    </div>
                    <div className="control">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="planQuantity"
                            label="Nombre de plan"
                            type="text"
                            id="planQuantity"
                            autoComplete="planQuantity"
                            onChange={handleChange}
                            value={values.planQuantity || ''}
                        />
                        {errors.planQuantity && (
                            <p className="help is-danger">{errors.planQuantity}</p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" /*onClick={props.setShow(false)}*/>
                        Close
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Commander
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
