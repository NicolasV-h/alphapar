import React, {useEffect, useState} from "react";
import {Modal, Button} from "react-bootstrap"
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

export default function ModalAddOrder(props) {

    const [plansNumber, setPlansNumber] = useState(1);
    const [modulePlanQuantity, setModulePlanQuantity] = useState([1]);
    const [modules, setModules] = useState(null);
    const [modulePlanName, setModulePlanName] = useState(['']);
    const children = [];

    useEffect(() => {
        axios.get('/plan')
            .then((response) => {
                setModules(response.data);
            }).catch(response => {
            alert(response);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const order = {
            "client_id": props.id,
            "plans": []
        };
        modulePlanName.map((item, i) => {
            order.plans.push({'plan_id': item, 'quantity': parseInt(modulePlanQuantity[i])});
        });

        axios.post('/order', order)
            .then(response => {
                if (response.data !== null) {
                    window.location.reload(false)
                }
            })
            .catch(error => {
                alert(error)
            });
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

    const classes = useStyles();
    
    const removePlan = (i) =>{
        setPlansNumber(plansNumber - 1);
        setModulePlanQuantity(modulePlanQuantity => modulePlanQuantity.filter((quantity, index) => i !== index));
        setModulePlanName(modulePlanName => modulePlanName.filter((name, index) => i !== index));
    };

    const ButtonAddModule = ({i}) => {
        if (plansNumber === i) {
            return (
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    className={"small-button px-2 blue"}
                    onClick={() => {
                        setPlansNumber(plansNumber + 1);
                        setModulePlanName(modulePieceName => [...modulePlanName, '']);
                        setModulePlanQuantity(modulePlanQuantity => [...modulePlanQuantity, 1]);
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
                    onClick={() => removePlan(i)}
                >
                    -
                </Button>

            );
        }
    };

    const handleChangeQuantity = (e, i) => {
        setModulePlanQuantity(
            modulePlanQuantity.map((item, index) => (
                index === i - 1 ? e.target.value : item
            ))
        )
    };

    const handleChangeName = (e, i) => {
        setModulePlanName(
            modulePlanName.map((item, index) => (
                index === i - 1 ? e.target.value : item
            ))
        )
    };


    const ContainerAddModule = (i) => {
        if (!modules) {
            return false;
        }
        for (let i = 1; i < plansNumber + 1; i++) {
            children.push(
                <div className="control d-flex justify-content-between align-items-center" key={['planNumber', i].join('_')}>
                    <FormControl className={classes.formControl + '  px-3'}>
                        <InputLabel id="demo-simple-select-label">Choisissez un plan</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id={"modulePlanName" + i}
                            value={modulePlanName[i - 1] || ''}
                            onChange={(e) => handleChangeName(e, i)}
                            name={"modulePlanName" + i}
                            type={"name"}
                            style={{minWidth:"300px"}}
                        >
                            {modules.map(module => (
                                <MenuItem value={module.id} key={module.id}>{module.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div
                        className={classes.formControl + ' px-3 d-flex justify-content-center align-items-center'}>
                        <TextField
                            className={`input px-2`}
                            variant="outlined"
                            margin="normal"
                            required
                            id={"modulePlanQuantity"}
                            label="Quantité"
                            name={"modulePlanQuantity"}
                            type={"text"}
                            onChange={(e) => handleChangeQuantity(e, i)}
                            value={modulePlanQuantity[i - 1] || ''}
                        />
                    </div>
                    <ButtonAddModule i={i}/>
                </div>
            );
        }
        return children;
    };

    return (
        <Modal show={props.showOrder} onHide={() => props.setShowOrder(false) } size="lg">
            <form noValidate onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer une commande</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ContainerAddModule/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShowOrder(false)}>
                        Fermer
                    </Button>
                    <Button
                        type="submit"
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
