import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication',
    initialState: {authenticated: false},
    reducers: {
        toLogIn(state) {
            state.authenticated = true;
        },

        toLogOut(state) {
            state.authenticated = false;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;