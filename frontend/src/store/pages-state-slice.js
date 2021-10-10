import {createSlice} from "@reduxjs/toolkit";

// const pagesState = {
//     mainPage: true,
//     eventPage: false,
//     profilePage: false
// }

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        mainPage: true,
        eventPage: false,
        profilePage: false,
        albumPage: false
    },
    reducers: {
        toggleMain(state) {
            state.mainPage = true;
            state.eventPage = false;
            state.profilePage = false;
            state.albumPage = false;
        },
        toggleEvent(state) {
            state.mainPage = false;
            state.eventPage = true;
            state.profilePage = false;
            state.albumPage = false;
        },
        toggleProfile(state) {
            state.mainPage = false;
            state.eventPage = false;
            state.profilePage = true;
            state.albumPage = false;
        },
        toggleAlbum(state) {
            state.mainPage = false;
            state.eventPage = false;
            state.profilePage = false;
            state.albumPage = true;
        }
        // togglePages (state, payload) {
        //     const name = payload;
        //     for (let key in state) {
        //         if (key === name){
        //             state[key] = true;
        //         } else {state[key] = false}
        //     }
        // }
    }
})

export const pagesAction = pagesSlice.actions;

export default pagesSlice;