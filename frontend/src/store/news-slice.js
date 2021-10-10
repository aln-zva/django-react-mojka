import {createSlice} from "@reduxjs/toolkit";

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        loading: false,
        newsData: null,
    },
    reducers: {
        setNews(state, payload) {
            state.newsData = payload
        }
    }
})

export const newsActions = newsSlice.actions

export default newsSlice