import React, {useEffect} from "react";
import {useAuth} from "../UserContext";
import {useHistory} from "react-router-dom";

function Module() {
    const auth = useAuth();
    const history = useHistory();

    useEffect(() =>{
        if(!localStorage.getItem('user_token')){
            history.push('/authentification')
        }
    }, []);

    const modules = [
        {
            "name": "Module 1",
            "price": "55.49",
            "quantity": "48",
            pieces: [
                {
                    "name": "piece 1",
                    "quantity": "2",
                },
                {
                    "name": "piece 2",
                    "quantity": "4",
                },
            ]
        },
        {
            "name": "Module 2",
            "price": "55.49",
            "quantity": "48",
            pieces: [
                {
                    "name": "piece 1",
                    "quantity": "2",
                },
                {
                    "name": "piece 2",
                    "quantity": "4",
                },
            ]
        },
        {
            "name": "Module 3",
            "price": "55.49",
            "quantity": "48",
            pieces: [
                {
                    "name": "piece 1",
                    "quantity": "2",
                },
                {
                    "name": "piece 2",
                    "quantity": "4",
                },
            ]
        },
        {
            "name": "Module 4",
            "price": "55.49",
            "quantity": "48",
            pieces: [
                {
                    "name": "piece 1",
                    "quantity": "2",
                },
                {
                    "name": "piece 2",
                    "quantity": "4",
                },
            ]
        },
    ];

    return (
        <>
            {}
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Quantité</th>
                </tr>
                </thead>
                <tbody>
                {modules.map(module =>
                    <tr key={module.name}>
                        <th scope="row">{module.name}</th>
                        <td>{module.price}</td>
                        <td>{module.quantity}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
}

export default Module
