import React, {useEffect, useState} from "react";
import {useAuth} from "../UserContext";
import {useHistory} from "react-router-dom";
import AddModule from "./AddModule";
import axios from "axios";
function Module() {
    const history = useHistory();
    const [toggleAddModule, setToggleAddModule] = useState(false);
    const [pieces, setPieces] = useState(null);
    const [plans, setPlans] = useState(null);

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
            axios.get('https://web.pierrehamel/plan')
                .then((response) => {
                    console.log(response.data)
                    setPlans(response.data);
                }).catch(response => {
                alert(response);
            });
        }
    }, []);

    return (
        <>
            <div className={"d-flex justify-content-center flex-column align-items-center"}>
                <button className={"btn-basic btn-basic-sm my-3"} onClick={() => setToggleAddModule(!toggleAddModule)}>
                    Ajouter un module
                </button>
                {toggleAddModule ? <AddModule pieces={pieces}/> : null}
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Nom pièce (Quantité)</th>
                    <th scope="col">Prix</th>
                </tr>
                </thead>
                <tbody>
                {plans ? plans.map((plan,i) =>
                    <tr key={plan.id}>
                        <th scope="row">{plan.name}</th>
                        <td>{plan.pieces.map(e => e.name + ' (' + e.quantity +')').join(', ')}</td>
                        <td>{plan.pieces.reduce(function (acc, obj) { return acc + (obj.unit_price*obj.quantity); }, 0)}</td>
                    </tr>
                ) : null}
                </tbody>
            </table>
        </>
    );
}

export default Module
