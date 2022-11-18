import React, {useEffect, useState} from "react";
import Accounts from "../components/Accounts"
import {useSelector, useDispatch} from "react-redux";
import {loadProfile, editProfile} from "../redux/slice";
import {useNavigate} from "react-router-dom";
import Loader from "../components/Loader";

/**
 * Profile page.
 *
 * @returns {*}
 * @constructor
 */
export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id, lastName, firstName, isError, errorMessage, isRemembered, email, isLoading} = useSelector((state) => state.auth);

    /**
     * Load user profile.
     */
    useEffect(() => {
        if (isError) alert(errorMessage);
        if (isRemembered) localStorage.setItem("rememberMe", JSON.stringify({isRemembered, email}));
        dispatch(loadProfile());
        navigate(`/profile/${id}`);
    }, [dispatch, navigate, isError, errorMessage, id, isRemembered, email]);

    /**
     * Handle change of user details.
     */
    const [updateForm, setUpdateForm] = useState(false);
    const [userData, setUserData] = useState({
        firstName: firstName,
        lastName: lastName
    });

    /**
     * Update formData state.
     *
     * @param event
     */
    function updateFormDataState(event) {
        setUserData((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value
        }));
    }

    /**
     * Submit form button action.
     *
     * @param event
     */
    function submitUpdateForm(event) {
        event.preventDefault();
        setUpdateForm(false);
        dispatch(editProfile(userData));
        dispatch(loadProfile());
    }

    if(isLoading) return <Loader/>;

    return (
        <>
            <div className="main bg-dark">
                <div className="header">
                    <h1>{!updateForm ? `Welcome back, ${firstName} ${lastName}` : `${firstName}'s profile change in process`}</h1>
                    <p>ClientID: {id}</p>
                    {updateForm ? (
                        <form className="edit-profile-form">
                            <div className="edit-profile-form-inputs">
                                <div className="input-wrapper">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        defaultValue={lastName}
                                        onChange={updateFormDataState}
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        defaultValue={firstName}
                                        onChange={updateFormDataState}
                                    />
                                </div>
                            </div>
                            <div className="edit-profile-form-buttons">
                                <button
                                    className="edit-button"
                                    type="submit"
                                    onClick={submitUpdateForm}>
                                    Save
                                </button>
                                <button
                                    className="edit-button"
                                    type="button"
                                    onClick={() => setUpdateForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            className="edit-button"
                            type="button"
                            onClick={() => setUpdateForm(true)}>
                            Edit Name
                        </button>
                    )}

                </div>
                <Accounts/>
            </div>
        </>
    )
}