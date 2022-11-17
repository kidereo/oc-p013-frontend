import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {loadProfile} from "../redux/slice";
import {useSelector, useDispatch} from "react-redux";

/**
 *  Render child elements of the /profile route.
 *
 * @returns {*}
 * @constructor
 */
export default function ProfileOutlet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, isError, errorMessage, isRemembered, email} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) alert(errorMessage);
        if (isRemembered) localStorage.setItem("rememberMe", JSON.stringify({isRemembered, email}));
        dispatch(loadProfile());
        navigate(`/profile/${id}`);
    }, [dispatch, navigate, isError, errorMessage, id, isRemembered, email]);

    return (
        <>
            <Outlet/>
            <span>If you can read this line, the app has most likely hit a Redux state manager problem.</span>
        </>
    );
};