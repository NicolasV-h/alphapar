import React, {useEffect, useState} from "react";
import {Modal, Button} from "react-bootstrap"
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio"
import axios from "axios";

export default function ModalAddInvoice(props) {

    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState('');

    const [isOrderPaid, setIsOrderPaid] = useState("0");

    useEffect(() => {
        axios.get("/order")
            .then(response => {
                return response.data.filter((order) => (
                    order.client_id === props.id
                ))
            }).then(ordersClient => {
            setOrders(ordersClient)
        })
            .catch(error => {
                console.log('erreur, veuillez contacter Bigoune')
            });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const invoice = {
            "order_id": orderId,
            "paid": isOrderPaid,
        };

        axios.post('/invoice', invoice)
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const handleChange = (event) => {
        setOrderId(event.target.value);
    };


    const classes = useStyles();

    return (
        <Modal show={props.showInvoice} onHide={() => props.setShowInvoice(false)}>
            <form noValidate onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Créer une facture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Commandes</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={orderId}
                            onChange={handleChange}>
                            {orders ? orders.map((order) => (
                                <MenuItem key={order.id} value={order.id}>
                                    Commande n{order.id}
                                </MenuItem>
                            )): null}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <RadioGroup aria-label="isOrderPaid" name="isOrderPaid" value={isOrderPaid} onChange={e => setIsOrderPaid(e.target.value)}>
                            <FormControlLabel value="0" control={<Radio/>} label="Non payée"/>
                            <FormControlLabel value="1" control={<Radio/>} label="Payé"/>
                        </RadioGroup>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setShowInvoice(false)}>
                        Fermer
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Créer
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
