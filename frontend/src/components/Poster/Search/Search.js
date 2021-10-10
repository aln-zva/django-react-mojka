import React, {useState} from 'react'

import classes from './Search.module.css'
import search_img from '../../../assets/search_img.png'
import {useSelector, useDispatch} from "react-redux";
import {eventsActions} from "../../../store/events-slice";
import axios from "axios";

const Search = props => {
    const dispatch = useDispatch()
    const eventsState = useSelector(state => state.event.eventData)
    const [value, setValue] = useState(" ")
    const chosenEvents = useSelector(state => state.event.activeEvents)

    // let events = []
    // let id = []
    // let str = ''
    //
    // const searchButtonHandler = (event) => {
    // setValue(event.target.value)
    //     if (eventState) {
    //         events = [...eventState.payload.results]
    //         }
    //         events = events.filter(e =>
    //             console.log(e.name.toLowerCase().includes(value.toLowerCase()))
    //         )
    //     if (chosenEvents.payload.length > 0 && isSelected && isPicked){
    //         const eventsUrl = `http://localhost:8000/events/?type_id=${str}&start_date=${start}&end_date=${end}&search=${value}`
    //         axios.get(eventsUrl).then((resp) => {
    //             const selectedEvents = resp.data;
    //             console.log(selectedEvents)
    //             dispatch(eventsActions.setActiveEvents(selectedEvents))
    //         });
    //     } else if (chosenEvents.payload.length > 0 && isSelected && !isPicked) {
    //         const eventsUrl = `http://localhost:8000/events/?type_id=${str}&search=${value}`
    //         axios.get(eventsUrl).then((resp) => {
    //             const selectedEvents = resp.data;
    //             console.log(selectedEvents)
    //             dispatch(eventsActions.setActiveEvents(selectedEvents))})
    //     }
    //         // dispatch(eventsActions.setEvents(events))
    //     console.log(events)
    // }
    //
    // console.log(filteredEvents)
    // console.log(events)

    return (
        <div className={classes.search}>
            <img src={search_img} alt=""/>
            <input
                type="text"
                placeholder="Поиск мероприятий"
                onChange={(event => props.onchange(event))}
            />
            <button onClick={props.search}>Найти</button>
        </div>
    )
}

export default Search;