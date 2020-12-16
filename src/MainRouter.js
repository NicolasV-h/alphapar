import React from "react";
import {
    Switch,
    Route,
} from "react-router-dom";
import Piece from "./piece/Piece";
import Module from "./module/Module";
import Client from "./client/Client";
import Authentification from "./authentification/Authentification";
import NotFound from "./NotFound/NotFound";
import Home from "./Home";
import ClientDetails from "./client/ClientDetails";

export default function MainRouter() {

    return (
            <Switch>
                <Route path="/clients">
                    <Client/>
                </Route>
                <Route path="/client/details">
                    <ClientDetails/>
                </Route>
                <Route path="/modules">
                    <Module/>
                </Route>
                <Route path="/pieces">
                    <Piece/>
                </Route>
                <Route path="/authentification">
                    <Authentification/>
                </Route>
                <Route path="/" exact component={Home}>
                </Route>
                <Route path={"/*"}>
                    <NotFound/>
                </Route>
            </Switch>
    );
}
