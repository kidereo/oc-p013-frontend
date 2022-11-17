import React from "react";
import Accounts from "../components/Accounts"
import {useSelector, useDispatch} from "react-redux";

/**
 * Profile page.
 *
 * @returns {*}
 * @constructor
 */
export default function Profile() {
    const {id, lastName, firstName} = useSelector((state) => state.auth);
    return (
        <>
            <div className="main bg-dark">
                <div className="header">
                    <h1>Welcome back,<br/>{firstName} {lastName}</h1>
                    <p>ClientID: {id}</p>
                    <button className="edit-button">Edit Name</button>
                </div>
                <Accounts/>
            </div>
        </>
    )
}