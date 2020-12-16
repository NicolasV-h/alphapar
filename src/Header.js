import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {
    NavLink, useLocation
} from "react-router-dom";
import logo from './assets/logo.png';
import {useAuth} from './UserContext';


export default function Header() {
    const auth = useAuth();
    const location = useLocation();

    const IsLoggedIn = () => {
        if(localStorage.getItem("user_token") === null){
            return (
                <NavLink to="/authentification" exact className={"nav-link"}>Log in</NavLink>
            );
        }else{
            return (
                <NavLink className={"nav-link"} exact onClick={auth.signout} to={'/'}>
                Logout
                </NavLink>
            );
        }
    };

    return (
        <Navbar expand="lg" className={location.pathname === '/' ? 'backgroundWhite': ''}>
            <div>
                <NavLink to="/" className={"nav-link"} style={{backgroundColor:'white'}}><img src={logo} alt={"logo"}/></NavLink>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/clients" className={"nav-link"}>Clients</NavLink>
                    <NavLink to="/pieces" className={"nav-link"}>Pièces</NavLink>
                    <NavLink to="/modules" className={"nav-link"}>Modules</NavLink>
                    <IsLoggedIn/>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
