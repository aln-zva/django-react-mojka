import { configureStore } from "@reduxjs/toolkit";
import logInFieldSlice from "./log-in-field-slice";
import toggleLogInSlice from "./log-in-toggle";
import authSlice from "./auth-slice";
import pagesSlice from "./pages-state-slice";
import eventSlice from "./events-slice";
import newsSlice from "./news-slice";
import mediaSlice from "./media-slice";
import eventTypeSlice from "./eventType-slice";
import togglePeriodSlice from "./toggle-period-slice";
import dateSlice from "./date-slice";


const my_store = configureStore({
    reducer: {
        loginField: logInFieldSlice.reducer,
        toggle: toggleLogInSlice.reducer,
        auth: authSlice.reducer,
        pages: pagesSlice.reducer,
        event: eventSlice.reducer,
        news: newsSlice.reducer,
        media: mediaSlice.reducer,
        eventType: eventTypeSlice.reducer,
        period: togglePeriodSlice.reducer,
        date: dateSlice.reducer
    }
})

export default my_store;

