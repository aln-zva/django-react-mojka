import {createSlice} from "@reduxjs/toolkit";

const logInFieldSlice = createSlice({
    name: 'loginField',
    initialState: {showLoginField: false},
    reducers: {
        toShowLogInField(state) {
            state.showLoginField = true;
        },

        toHideLogInField(state) {
            state.showLoginField = false;
        }
    }
});

export const logInFieldActions = logInFieldSlice.actions;

export default logInFieldSlice;