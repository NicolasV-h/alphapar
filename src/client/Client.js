import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useAuth} from '../UserContext';
import AddClient from "./AddClient";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {makeStyles} from "@material-ui/core/styles";
import ModalAddClient from "./ModalAddClient";

export default function Client() {

    const auth = useAuth();
    const history = useHistory();
    const [clientInvoices, setClientInvoices] = useState({});
    const [toggleAddClient, setToggleAddClient] = useState(false);
    //const handleAddClient = () => setToggleAddClient(!toggleAddClient);

    /*****MODAL****/
    //const [show, setShow] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            history.push('/authentification')
        }
    });

    const clients = [
        {
            "id": 1,
            "name": "Google",
            "address": "1 rue du poitou charente",
            "email": "1 rue du poitou charente",
            "phone": "+33 8 98 69 69 69",
        },
        {
            "id": 1,
            "name": "Microsoft",
            "address": "1 rue du poitou charente",
            "email": "1 rue du poitou charente",
            "phone": "+33 8 98 69 69 69",
        },
        {
            "id": 1,
            "name": "Apple",
            "address": "1 rue du poitou charente",
            "email": "1 rue du poitou charente",
            "phone": "+33 8 98 69 69 69",
        },
        {
            "id": 1,
            "name": "Bigoune",
            "address": "1 rue du poitou charente",
            "email": "1 rue du poitou charente",
            "phone": "+33 8 98 69 69 69",
        },
    ];

    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: "#2bbbad",
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

    return (
        <>
            <div className={"d-flex justify-content-center flex-column align-items-center"}>
                <button className={"btn-basic btn-basic-sm my-3"}>
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
                    <th scope="col">Commander</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => {
                        return (
                            <tr key={client.name} onClick={() => handleClientDetails(client)}>
                                <th scope="row">{client.name}</th>
                                <td>{client.address}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td className={"d-flex justify-content-center"}>
                                    {<Avatar className={classes.avatar} /*onClick={setShow(true)}*/ >
                                        <ShoppingCartIcon/>
                                    </Avatar>}
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </table>
            <ModalAddClient /*show={show} setShow={setShow}*//>
        </>
    );
}

