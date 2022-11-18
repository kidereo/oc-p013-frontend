import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../data/api";

const user = JSON.parse(localStorage.getItem("accessToken"));
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    successMessage: "",
    errorMessage: "",
    id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isRemembered: false,
};

/**
 * Async login action.
 *
 * @type {AsyncThunk<any, void, AsyncThunkConfig>}
 */
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

/**
 * Async logout action.
 *
 * @type {AsyncThunk<any, void, AsyncThunkConfig>}
 */
export const logout = createAsyncThunk("auth/logout", async () => {
    authService.logout();
});


/**
 * Async load profile action.
 *
 * @type {AsyncThunk<any, void, AsyncThunkConfig>}
 */
export const loadProfile = createAsyncThunk("auth/loadProfile", async (thunkAPI) => {
    try {
        const response = await authService.retrieveProfile();
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

/**
 * Redux auth slice.
 *
 * @type {Slice<{isLoading: boolean, firstName: string, lastName: string, password: string, isError: boolean, id: string, message: string, user: null, email: string, isSuccess: boolean, isRemembered: boolean}, {reset: authSlice.reducers.reset, rememberMe: authSlice.reducers.rememberMe}, string>}
 */
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.successMessage = "";
            state.errorMessage = "";
            state.id = "";
            state.email = "";
            state.password = "";
            state.firstName = "";
            state.lastName = "";
            state.isRemembered = false;
        },
        rememberMe: (state, action) => {
            state.isRemembered = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.successMessage = action.payload.message;
                state.user = action.payload;
                state.subtoken = action.payload.body.token.substr(action.payload.body.token.length - 5);
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.errorMessage = action.payload;
                state.user = null;
            })
            .addCase(loadProfile.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
            .addCase(loadProfile.rejected, (state, action) => {
                state.isError = true;
                state.errorMessage = action.payload;
            })
    }
});

export const {reset, rememberMe} = authSlice.actions;

export default authSlice.reducer;