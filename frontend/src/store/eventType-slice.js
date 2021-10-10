import {createSlice} from "@reduxjs/toolkit";

const eventTypeSlice = createSlice({
    name: 'eventType',
    initialState: {
        typesState: null,
        activeTypes: null,
        acceptTypes:false,
        selectedTypes: []
    },
    reducers: {
        setTypes(state, payload) {
            state.typesState = payload
        },
        setActive(state, payload) {
            state.activeTypes = payload
        },
        setAccept(state) {
            state.acceptTypes = true
        },
        setNoTypes(state) {
            state.acceptTypes = false
        },
        setSelected(state, payload) {
            state.selectedTypes = payload
        }
    }
})

export const eventTypesActions = eventTypeSlice.actions

export default eventTypeSlice