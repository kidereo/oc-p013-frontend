import React from "react";
import Logo from "../assets/argentBankLogo.png";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {IconContext} from "react-icons";
import {FaUserCircle, FaSignOutAlt} from "react-icons/fa";
import {logout, reset} from "../redux/slice";

/**
 * Header component for every page.
 *
 * @returns {*}
 * @constructor
 */
export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, firstName, id} = useSelector((state) => state.auth);

    /**
     * Handle user sign out.
     */
    function logoutUser() {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
        window.location.reload();
    }

    return (
        <>
            <div className="main-nav">
                <NavLink to="/">
                    <img src={Logo} alt="Argent Bank Logo" className="main-nav-logo-image"/>
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <>
                    {user ? (
                        <div className="main-nav-flex">
                            <NavLink to={`/profile/${id}`}
                                     className={({isActive}) => isActive ? "main-nav-item_active" : "main-nav-item"}>
                                <IconContext.Provider value={{size: "1.5em"}}>
                                    <FaUserCircle/>
                                    <span>{firstName}</span>
                                </IconContext.Provider>
                            </NavLink>
                            <Link to="" className="main-nav-item" onClick={logoutUser}>
                                <IconContext.Provider value={{size: "1.5em"}}>
                                    <FaSignOutAlt/>
                                    <span>Sign Out</span>
                                </IconContext.Provider>
                            </Link>
                        </div>
                    ) : (
                        <div className="main-nav-flex">
                            <NavLink to="/sign-in"
                                     className={({isActive}) => isActive ? "main-nav-item_active" : "main-nav-item"}>
                                <IconContext.Provider value={{size: "1.5em"}}>
                                    <FaUserCircle/>
                                </IconContext.Provider>
                                <span>Sign In</span>
                            </NavLink>
                        </div>
                    )}
                </>
            </div>
        </>
    )
}