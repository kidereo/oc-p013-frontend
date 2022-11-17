import axios from "axios";

/**
 * API url endpoints.
 * @type {string}
 */
const BASE_URL = "http://localhost:3001/api/v1/user/";
const LOGIN_ENDPOINT = "login";
const PROFILE_ENDPOINT = "profile";

/**
 * Build up the header.
 *
 * @returns {{}|{authorization: string, "Content-Type": string}}
 */
function customHeader() {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
        return {
            "Content-Type": "application/json",
            authorization: "Bearer " + token
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
        method: "post",
        url: BASE_URL + LOGIN_ENDPOINT,
        data: credentials
    })
        .then((response) => {
            if (response.data.body.token) {
                localStorage.setItem(
                    "accessToken",
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
        localStorage.removeItem("accessToken");
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
        method: "post",
        url: BASE_URL + PROFILE_ENDPOINT,
        headers: customHeader()
    });
}

const authService = {
    customHeader,
    login,
    logout,
    retrieveProfile
};

export default authService;
