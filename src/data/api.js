import axios from "axios";
import {apiConfig} from "../config";

/**
 * Build up the header.
 *
 * @returns {{}|{authorization: string, "Content-Type": string}}
 */
function customHeader() {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
        return {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
        };
    } else {
        return {};
    }
}

/**
 * Pass user credentials to the backend and return token if the user is cosher.
 *
 * @param credentials
 * @returns {Promise<AxiosResponse<T>>}
 */
async function login(credentials) {
    // return await axios.post(BASE_URL + LOGIN_ENDPOINT, credentials)
    return await axios({
        method: "POST",
        url: apiConfig.BASE_URL + apiConfig.LOGIN_ENDPOINT,
        data: credentials
    })
        .then((response) => {
            if (response.data.body.token) {
                localStorage.setItem(
                    "authToken",
                    JSON.stringify(response.data.body.token)
                );
            }
            return response.data;
        });
}

/**
 * Log out currently signed in user.
 */
function logout() {
    if (localStorage.getItem("rememberMe")) {
        localStorage.removeItem("authToken");
    } else {
        localStorage.clear();
    }
}

/**
 * Retrieve profile of the signed in user.
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
async function retrieveProfile() {
    return await axios({
        method: "POST",
        url: apiConfig.BASE_URL + apiConfig.PROFILE_ENDPOINT,
        headers: customHeader()
    });
}

/**
 * Edit profile of the signed in user
 *
 * @returns {Promise<AxiosResponse<T>>}
 */
async function editUserProfile(data) {
    return await axios({
        method: "PUT",
        url: apiConfig.BASE_URL + apiConfig.PROFILE_ENDPOINT,
        data: data,
        headers: customHeader()
    })
        .then((response) => {
            return response.data;
        })
}

const authService = {
    login,
    logout,
    retrieveProfile,
    editUserProfile
};

export default authService;
