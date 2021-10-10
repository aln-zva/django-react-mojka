import {createSlice} from "@reduxjs/toolkit";
//для кнопки войти и отображения всех окон входа/регистрации в App
const togglePeriodSlice = createSlice({
    name: 'periodToggle',
    initialState: {toShow: false},
    reducers: {
        togglePeriod(state) {
            state.toShow = !state.toShow;
        },

    }
});

export const togglePeriodActions = togglePeriodSlice.actions;

export default togglePeriodSlice;