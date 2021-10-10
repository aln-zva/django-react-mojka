import {createSlice} from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: 'event',
    initialState: {
        loading: false,
        eventData: null,
        pageSize: 6,
        totalEventCount: 0,
        currentPage: 1,
        eventPages: null,
        activeEvents: null,
        allEvents: null,
        currentEvent: null
    },
    reducers: {
        setEvents(state, payload) {
            state.eventData = payload
        },
        setCount (state, payload) {
            state.totalEventCount = payload
        },
        setEventPages (state, payload) {
            state.eventPages = payload
        },
        setCurrentPage (state, payload) {
            state.currentPage = payload.payload
        },
        setActiveEvents (state, payload) {
            state.activeEvents = payload
        },
        setAll(state, payload) {
            state.allEvents = payload
        },
        setCurrent(state, payload) {
            state.currentEvent = payload
        }
    }
})

export const eventsActions = eventSlice.actions

export default eventSlice