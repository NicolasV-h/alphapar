import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import AddClient from "./AddClient";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {makeStyles} from "@material-ui/core/styles";
import ModalAddInvoice from "./ModalAddInvoice";
import DescriptionIcon from '@material-ui/icons/Description';
import axios from "axios";
import ModalAddOrder from "./ModalAddOrder";

export default function Client() {

    const history = useHistory();
    const [toggleAddClient, setToggleAddClient] = useState(false);
    const [clients, setClients] = useState(null);
    const [currentClient, setCurrentClient] = useState(null);

    /*****MODAL****/
    const [showInvoice, setShowInvoice] = useState(false);
    const [showOrder, setShowOrder] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            history.push('/authentification')
        } else {
            axios.get('http://localhost:8000/client')
                .then((response) => {
                    setClients(response.data);
                }).catch(response => {
                alert(response);
            });
        }
    }, []);

    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: "#3F51B5",
            cursor: "pointer",
        }
    }));

    const classes = useStyles();

    const handleClientDetails = (client) => {
        history.push({
            pathname: "/client/details",
            state: {"client": client}
        });
    };

    const ClientTable = () => {
        if (clients) {
            return (
                clients?.map(client => (
                        <tr key={client.name}>
                            <th scope="row" style={{textDecoration:'underline', cursor:'pointer'}} onClick={() => handleClientDetails(client)}>{client.name}</th>
                            <td>{client.address}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td className={"d-flex justify-content-center"}>
                                {<Avatar className={classes.avatar + ' mx-2 blue'} onClick={() => {
                                    setShowInvoice(true);
                                    setCurrentClient(client.id);
                                }}>
                                    <DescriptionIcon/>
                                </Avatar>}
                                {<Avatar className={classes.avatar + ' mx-2'} onClick={() => {
                                    setShowOrder(true)
                                    setCurrentClient(client.id);
                                }}>
                                    <ShoppingCartIcon/>
                                </Avatar>}
                            </td>
                        </tr>
                    )
                ));
        }
        return false;
    };

    return (
        <>
            <div className={"d-flex justify-content-center flex-column align-items-center"}>
                <button className={"btn-basic btn-basic-sm my-3"} onClick={() => setToggleAddClient(!toggleAddClient)}>
                    Ajouter un client
                </button>
                {toggleAddClient ? <AddClient/> : null}
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <ClientTable/>
                </tbody>
            </table>
            {showInvoice ? <ModalAddInvoice showInvoice={showInvoice} setShowInvoice={setShowInvoice} id={currentClient}/> : null}
            {showOrder ? <ModalAddOrder showOrder={showOrder} setShowOrder={setShowOrder} id={currentClient}/> : null}
        </>
    );
}

