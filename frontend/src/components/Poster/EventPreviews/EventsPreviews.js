import React, {useEffect, useState} from 'react'

import classes from './EventPreviews.module.css'
import EventPreviewCard from "./EventPreviewCard/EventPreviewCard";
import {useSelector, useDispatch} from "react-redux";
import {eventsActions} from "../../../store/events-slice";
import {eventTypesActions} from "../../../store/eventType-slice";
import axios from "axios";
import {pagesAction} from "../../../store/pages-state-slice";

const EventsPreviews = props => {
    const dispatch = useDispatch()
    const typesState = [
        {label: 'Благотворительное', type: 'charity', id:1},
        {label: 'Развлекательное', type: 'entertainment', id:2},
        {label: 'Образовательное', type: 'educational', id: 3},
        {label: 'Спортивное', type: 'sports', id: 4},
        {label: 'Творческое', type: 'creative', id: 5}
    ];
    const eventsState = useSelector(state => state.event.eventData)
    console.log (eventsState)
    // const eventsOnPage = useSelector(state => state.event.eventPages)
    //
    const types = useSelector(state => state.eventType.typesState)
    const activeTypes = useSelector(state => state.eventType.activeTypes)
    console.log(activeTypes)

    let events = []
    console.log(eventsState)
    if (eventsState)
    {
        if (eventsState.payload['count']){
            console.log(1)
            events = [...eventsState.payload.results]
        } else {
            console.log(1)
            events = [...eventsState.payload]
        }
    }
    // let activeTypes = []
    let activeEvents = []
    let selectedTypes = []
    // let currentEvents = []
    // const [activeArr, setActiveEvents] = useState({
    //     eventsActive: null
    // })
    // if (eventsOnPage) {currentEvents = [...eventsOnPage.payload.events]}
    if(activeTypes){
        selectedTypes = typesState.filter(type => activeTypes.payload[type.type])
        console.log(selectedTypes)
        }

    const [selectEvents, setSelectEvents] = useState({events: null})
    const chosenEvents = useSelector(state => state.event.activeEvents)
    const isTypes = useSelector(state => state.eventType.acceptTypes)

    console.log(chosenEvents)
    if (chosenEvents !== null) {
        if (chosenEvents.payload['count'] || chosenEvents.payload['count'] === 0){
            console.log(chosenEvents.payload.length)
            console.log(1)
            activeEvents = [...chosenEvents.payload.results]
        } else {
            console.log(chosenEvents.payload.length)
            console.log(chosenEvents)
            activeEvents = [...chosenEvents.payload]
        }
    }

    if (activeEvents === null) {
        activeEvents = [...eventsState]
    }
    console.log(chosenEvents)

    const openEventPage = () => {
        dispatch(pagesAction.toggleEvent())
        const eventsUrl = 'http://localhost:8000/events_all'
        axios.get(eventsUrl).then((resp) => {
            const allEvents = resp.data;
            console.log(allEvents)
            dispatch(eventsActions.setAll(allEvents.results));
        })
    }
    return (
        <div className={classes.eventPreviews}>
            {(chosenEvents && activeEvents) && activeEvents.length > 0 ? activeEvents.map(item =>
                <EventPreviewCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type_id}
                    start_date={item.start_date}
                    end_date={item.end_date}
                    image={item.main_photo}
                    open={openEventPage}
                />
            ) : (chosenEvents && chosenEvents.payload['count'] === 0) && activeEvents.length === 0 ?
                <div>
                    <div>Меро с заданными условиями поиска не найдены :(</div>
                    <button onClick={() => props.reset()}>Сбросить условия поиска</button>
                </div> :
                (chosenEvents === null || activeTypes.length === 0) && events.map(item =>
                <EventPreviewCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type_id}
                    start_date={item.start_date}
                    end_date={item.end_date}
                    image={item.main_photo}
                    open={openEventPage}
                />)}
        </div>
    )
}

export default EventsPreviews;