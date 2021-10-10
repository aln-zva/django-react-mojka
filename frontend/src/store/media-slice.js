import {createSlice} from "@reduxjs/toolkit";

const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        loading: false,
        mediaData: null,
        mediaOnPage: null,
        mediaSelected: false
    },
    reducers: {
        setMedia(state, payload) {
            state.mediaData = payload
        },
        setOnPage(state, payload) {
            state.mediaOnPage = payload
        }
    }
})

export const mediaActions = mediaSlice.actions

export default mediaSlice