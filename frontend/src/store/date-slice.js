import {createSlice} from "@reduxjs/toolkit";
import moment from 'moment'
import 'moment/locale/ru'
//для кнопки войти и отображения всех окон входа/регистрации в App
const dateSlice = createSlice({
    name: 'date',
    initialState: {
        isPicked: false,
        start_date: moment().locale("ru"),
        end_date: moment().locale("ru")
    },
    reducers: {
        togglePicker(state) {
            state.isPicked = true;
        },
        setTurnOff(state) {
            state.isPicked = false;
        },
        setStartDate(state, payload) {
            state.start_date = payload
        },
        setEndDate(state, payload) {
            state. end_date = payload
        }
    }
});

export const dateActions = dateSlice.actions;

export default dateSlice;