import React, {useEffect, useState} from "react";
import {useAuth} from "../UserContext";
import {useHistory} from "react-router-dom";
import AddPiece from "./AddPiece";
import axios from "axios";

export default function Piece() {

    const history = useHistory();
    const [pieces, setPieces] = useState(null);
    const [toggleAddPiece, setToggleAddPiece] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('user_token')) {
            history.push('/authentification')
        } else {
            axios.get('https://web.pierrehamel/piece')
                .then((response) => {
                    setPieces(response.data);
                }).catch(response => {
                alert(response);
            });
        }
    }, []);

    const PieceTable = () => {
        if (pieces) {
            return (
                pieces.map(piece =>
                    <tr key={piece.name}>
                        <th scope="row">{piece.name}</th>
                        <td>{piece.price}</td>
                    </tr>
                )
            );
        }
        return (<tr><th>Aucune pièce n'est disponible pour le moment !!</th></tr>);
    };

    return (
        <>
            <div className={"d-flex justify-content-center flex-column align-items-center"}>
                <button className={"btn-basic btn-basic-sm my-3"} onClick={() => setToggleAddPiece(!toggleAddPiece)}>
                    Ajouter une pièce
                </button>
                {toggleAddPiece ? <AddPiece/> : null}
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Prix</th>
                </tr>
                </thead>
                <tbody>
                <PieceTable/>
                </tbody>
            </table>
        </>
    );
}
