import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./Header";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {ProvideAuth} from "./UserContext";
import MainRouter from "./MainRouter";

function App() {


    return (
        <div className='App'>
            <ProvideAuth>
                <BrowserRouter>
                    <Header/>
                    <MainRouter/>
                </BrowserRouter>
            </ProvideAuth>
        </div>
    );
}

export default App;
