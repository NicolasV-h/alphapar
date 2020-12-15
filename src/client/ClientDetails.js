import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import AddMessage from "./AddMessage";
import axios from "axios";
import Test from "./Test";
import {transformDate} from '../utils/utils';

export default function ClientDetails(props) {
    const location = useLocation();
    const [toggledDiv, setToggledDiv] = useState(0);
    const [toggleAddMessage, setToggleAddMessage] = useState(0);
    const [orders, setOrders] = useState(null);
    const [invoices, setInvoices] = useState(null);
    const [plans, setPlans] = useState(null);
    const history = useHistory();


    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            history.push('/authentification')
        } else {
            axios.get("http://localhost:8000/order")
                .then(response => {
                    return response.data.filter((order) => (
                        order.client_id === location.state.client.id
                    ))
                }).then(ordersClient => {
                    setOrders(ordersClient)
                }
            )
                .catch(error => {
                    console.log(error)
                });


            axios.get("http://localhost:8000/plan")
                .then(response => {
                        setPlans(response.data)
                    }
                )
                .catch(error => {
                    console.log(error)
                });
        }
    }, []);


    useEffect(()=>{
        if(orders){
            axios.get("http://localhost:8000/invoice")
                .then(response => {
                    return response.data.filter(invoice =>{
                        return (orders.map(current => current.id).includes(invoice.order_id))
                        return false;
                    })
                }).then(clientInvoice =>{
                setInvoices(clientInvoice);
            })
                .catch(error => {
                    console.log(error)
                });
        }
    }, [orders]);


    const payInvoice = (invoiceId) =>{
        const invoice = {
            "invoice_id": invoiceId,
            "paid": true
        };
        axios.put('http://localhost:8000/invoice', invoice)
            .then(response => {
                if (response.data !== null) {
                    window.location.reload(false)
                }
            })
            .catch(error => {
                alert(error)
            });
    };


    const Orders = (props) => {
        if (orders) {
            return (
                orders?.map((order, j) => (
                    props.order_id === order.id ? <div key={j + "order" + order.id} className={"order-container"}>
                        <div className={"my-2"}><span
                            className={"font-weight-bold"}>Commandée le :</span> {transformDate(order.created_at)}</div>
                        <div className={"d-flex justify-content-center"}>
                            {toggledDiv !== props.invoice_id ?
                                <button onClick={() => setToggledDiv(props.invoice_id)}>Détails</button> : null}
                            {toggledDiv === props.invoice_id ? <ToggleOrderDetails currentOrder={order}/> : null}
                        </div>
                    </div> : null
                )));
        }
        return false;
    };

    const ToggleOrderDetails = (props) => {
        if(!plans){
            return false;
        }
        var currentPlans = plans.filter(plan => {
            return (props.currentOrder.plans.map(current => current.plan_id).includes(plan.id)
            )
        });

        if (currentPlans) {
            return (
                currentPlans.map((plan, i) =>
                    <div key={plan.id} className={"plan-container"}>
                        <p>Nom du plan : {plan.name}</p>
                        <p>Quantité : {props.currentOrder.plans[i].quantity}</p>
                        <p>Prix : {props.currentOrder.plans[i].price} €</p>
                        <div className={'d-flex flex-column'}>
                            <h6>Pièce(s)</h6>
                            {plan.pieces.map((piece, i) =>
                                <div key={piece.id + ' ' + plan.id + ' ' + i} className={"piece-container"}>
                                    <p><span className={"font-weight-bold"}>Nom : </span>{piece.name}</p>
                                    <p><span className={"font-weight-bold"}>Quantité : </span>{piece.quantity}</p>
                                    <p><span className={"font-weight-bold"}>Prix unitaire : </span>{piece.unit_price} €
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )
            );
        }
        return false;
    };

    const IsPaid = (props) =>{
        return (
            props.paidAt ? <div>Payée le : {transformDate(props.paidAt)}</div> : <div className={'btn-basic btn-basic-sm'} onClick={() => payInvoice(props.invoiceId)}>Payer la facture</div>
        );
    };

    return (
        <>
            <h2>{location.state.client.name}</h2>
            <div className={'d-flex flex-column align-items-start pl-2'}>
                <p>
                    <span className={"font-weight-bold"}>Adresse : </span>{location.state.client.address}
                </p>
                <p>
                    <span className={"font-weight-bold"}>Email : </span>{location.state.client.email}
                </p>
                <p>
                    <span className={"font-weight-bold"}>Numéro de téléphone : </span>{location.state.client.phone}
                </p>
            </div>

            <div className={"d-flex justify-content-center flex-column align-items-center"}>
                <button className={"btn-basic btn-basic-sm my-3"}
                        onClick={() => setToggleAddMessage(!toggleAddMessage)}>
                    Voir les messages
                </button>
                {toggleAddMessage ? <AddMessage id={location.state.client.id}/> : null}
            </div>
            {invoices ? invoices.map((invoice, i) => {
                    return (
                        <div key={invoice.id} className={"invoice-container p-2"}>
                            <h5>Facture {i + 1}</h5>
                            <div className={'d-flex justify-content-center'}>
                                <Test invoice={invoice} orders={orders} plans={plans} orderId={invoice.order_id}/>
                            </div>
                            <IsPaid invoiceId={invoice.id} paidAt={invoice.paid_at}/>
                            <div>Créée le : {transformDate(invoice.created_at)}</div>
                            <h5 className={"mt-5"}>Commandes</h5>
                            <div className={"d-flex justify-content-around"}>
                                <Orders order_id={invoice.order_id} invoice_id={invoice.id}/>
                            </div>
                        </div>
                    );
                }
            ) : null}
        </>
    );
}
