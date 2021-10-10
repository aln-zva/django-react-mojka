import {createSlice} from "@reduxjs/toolkit";
//для кнопки войти и отображения всех окон входа/регистрации в App
const toggleLogInSlice = createSlice({
    name: 'loginToggle',
    initialState: {toShow: false},
    reducers: {
        toggle(state) {
            state.toShow = !state.toShow;
        },

    }
});

export const toggleLogInActions = toggleLogInSlice.actions;

export default toggleLogInSlice;