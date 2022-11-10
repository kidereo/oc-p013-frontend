import React from "react";
import Logo from "../assets/argentBankLogo.png";
import {NavLink} from "react-router-dom";
import {IconContext} from "react-icons";
import {FaUserCircle} from "react-icons/fa";

/**
 * Header component for every page.
 *
 * @returns {*}
 * @constructor
 */
export default function Header() {
    return (
        <>
            <div className="main-nav">
                <NavLink to="/">
                    <img src={Logo} alt="Argent Bank Logo" className="main-nav-logo-image"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div className="main-nav-flex">
                    <NavLink to="/sign-in"
                             className={({isActive}) => isActive ? "main-nav-item_active" : "main-nav-item"}>
                        <IconContext.Provider value={{size: "1.5em"}}>
                            <FaUserCircle/>
                        </IconContext.Provider>
                        <span>Sign In</span>
                    </NavLink>
                </div>
            </div>
        </>
    )
}