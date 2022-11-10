import React from "react";
import {IconContext} from "react-icons";
import {FaUserCircle} from "react-icons/fa";

export default function SignIn() {
    return (
        <>
            <div className="main bg-dark">
                <section className="sign-in-content">
                    <IconContext.Provider value={{size: "5em"}}>
                        <FaUserCircle/>
                    </IconContext.Provider>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username"/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password"/>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me"/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <button className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </div>
        </>
    )
}