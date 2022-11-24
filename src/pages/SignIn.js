import React, {useEffect, useState} from "react";
import {IconContext} from "react-icons";
import {FaUserCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, rememberMe, reset} from "../redux/slice";

/**
 * Sign In component.
 *
 * @returns {*}
 * @constructor
 */
export default function SignIn() {
    const rememberLogin = JSON.parse(localStorage.getItem("rememberMe"));
    const [formData, setFormData] = useState({
        email: rememberLogin ? rememberLogin.email : "",
        password: ""
    });
    const {email, password} = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const {user, isError, isSuccess, errorMessage, successMessage} = useSelector((state => state.auth));

    useEffect(() => {
        if (isError) {
            alert(errorMessage);
            dispatch(reset());
        } else if (isSuccess) {
            localStorage.removeItem("rememberMe");
            console.log(successMessage);
            navigate("/profile");
            if (checked) {
                localStorage.removeItem("rememberMe");
                dispatch(rememberMe());
                console.log("User successfully logged in with Remember me option activated");
                navigate("/profile");
            }
        }
    }, [user, isError, isSuccess, errorMessage, successMessage, navigate, dispatch, checked]);

    /**
     * Update formData state.
     *
     * @param event
     */
    function updateFormDataState(event) {
        setFormData((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }));
    }

    /**
     * Validate userData and submit button action.
     *
     * @param event
     */
    function submitUserData(event) {
        const credentials = {
            email,
            password
        };
        event.preventDefault();
        if (!credentials.email) alert("Please type your email!");
        else if (!credentials.password) alert("Please type your password!");
        else dispatch(login(credentials));
    }

    return (
        <>
            <div className="main bg-dark">
                <section className="sign-in-content">
                    <IconContext.Provider value={{size: "5em"}}>
                        <FaUserCircle/>
                    </IconContext.Provider>
                    <h1>Sign In</h1>
                    <form onSubmit={submitUserData}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={email} onChange={updateFormDataState}/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={password} onChange={updateFormDataState}/>
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" name="remember-me"
                                   onChange={(e) => setChecked(e.target.checked)}/>
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </div>
        </>
    )
}