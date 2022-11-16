import axios from "axios";

/**
 * API url endpoints.
 * @type {string}
 */
const BASE_URL = "http://localhost:3001/api/v1/user/";
const LOGIN_ENDPOINT = "login";

/**
 * Build up authentication header.
 *
 * @returns {{}|{authorization: string, "Content-Type": string}}
 */
function authHeader() {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
        return {
            "Content-Type": "application/json",
            authorization: "Bearer" + token
        };
    } else {
        return {}
    }
}

/**
 * Pass user details to the backend and return token if the user is cosher.
 *
 * @param userData
 * @returns {Promise<AxiosResponse<T>>}
 */
async function login(userData) {
    return await axios.post(BASE_URL + LOGIN_ENDPOINT, userData)
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

const authService = {
    authHeader,
    login,
    logout
};

export default authService;
