import React, {useEffect} from "react";
import {useAuth} from "../UserContext";
import {useHistory} from "react-router-dom";

export default function Piece(){
    const auth = useAuth();
    const history = useHistory();

    useEffect(() =>{
        if(!localStorage.getItem('user_token')){
            history.push('/authentification')
        }
    }, []);
    const pieces = [
        {
            "name": "Pièce 1",
            "price": "55.49",
        },
        {
            "name": "Pièce 2",
            "price": "55.49",
        },
        {
            "name": "Pièce 3",
            "price": "55.49",
        },
        {
            "name": "Pièce 4",
            "price": "55.49",
        },
    ];

    return (
        <>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Prix</th>
                </tr>
                </thead>
                <tbody>
                {pieces.map(piece =>
                    <tr key={piece.name}>
                        <th scope="row">{piece.name}</th>
                        <td>{piece.price}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
}
