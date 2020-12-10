import React, {useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useLocation} from "react-router-dom";

export default function ClientDetails(props) {
    const location = useLocation();

    useEffect(() => {
        console.log(invoices);
    }, []);

    const invoices = [
        {
            "id": "22",
            "created_at": "06/12/2020",
            "paid_at": "06/12/2020",
            "order_id": 5
        },
        {
            "id": "25",
            "created_at": "08/12/2020",
            "paid_at": "08/12/2020",
            "order_id": 5
        },
    ];

    const orders = [
        {
            "id": "22",
            "created_at": "06/12/2020",
            "plan": [{
                "price": 16.85,
                "plan_id": 8,
                "id": 2,
                "quantity": 1,
            }]
        },
        {
            "id": "22",
            "created_at": "06/12/2020",
            "plan": [{
                "price": 16.85,
                "plan_id": 8,
                "id": 3,
                "quantity": 1,
            }]
        },
    ];


    return (
        <>
            <h2>{location.state.client.name}</h2>
            <p>
                Adresse : {location.state.client.address}
            </p>
            <p>
                Email : {location.state.client.email}
            </p>
            <p>
                Numéro de téléphone : {location.state.client.phone}
            </p>
            {invoices.map((invoice, i) => {
                    return (
                        <div key={invoice.id}>
                            <h5>Factures {i}</h5>
                            <div>Créée le : {invoice.created_at}</div>
                            <div>Payée le : {invoice.paid_at}</div>
                            <h5>Commandes</h5>
                            {orders.map((order, j) =>
                                <div key={j + "order" + order.id}>
                                    <div>Créée le : {order.created_at}</div>
                                    <div>Commandée le : {order.created}</div>
                                    <div>Payée le : {order.paid}</div>
                                    <div className={"d-flex justify-content-center"}><button className={"btn-basic btn-basic-sm"}>Détails</button></div>
                                </div>
                            )}
                        </div>
                    );
                }
            )}

        </>

    );
}
