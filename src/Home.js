import {React} from "react";
import {NavLink} from "react-router-dom";

function Home() {

    return (
        <>
            <div className={"home"}>
            </div>
            <div className={"homeText"}>
                    <h1>AlphaPar</h1>
                    <h6 className={"mt-4"}>Fabrication de module pour centrale électrique et nucléaire</h6>
            </div>
            <div className={"homeButtons"}>
                <button className={"btn-basic"}><NavLink to="/authentification" className={"nav-link"}>Se connecter</NavLink></button>
                <button className={"btn-basic"}><NavLink to="/authentification/register" className={"nav-link"}>S'enregistrer</NavLink></button>
            </div>
        </>
    );
}

export default Home
