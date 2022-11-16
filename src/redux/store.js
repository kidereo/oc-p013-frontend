import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice";

/**
 * Redux store.
 *
 * @type {EnhancedStore<any, [ThunkMiddlewareFor<S>]>}
 */
const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export default store;