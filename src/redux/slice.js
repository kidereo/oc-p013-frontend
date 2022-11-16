import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../data/api";

const user = JSON.parse(localStorage.getItem("accessToken"));
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
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
            state.isLoading = false;
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
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.successMessage = action.payload.message;
                state.user = action.payload;
                state.subtoken = action.payload.body.token.substr(action.payload.body.token.length-5);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload;
                state.user = null;
            })
    }
});

export const {reset, rememberMe} = authSlice.actions;

export default authSlice.reducer;