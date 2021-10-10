import React, {useEffect, useState} from 'react'

import Filter from "./Filter/Filter";
import FilterData from "./Filter/FilterData";
import classes from './Filters.module.css'
import {useDispatch, useSelector} from "react-redux";
import {eventsActions} from "../../../store/events-slice";
import {dateActions} from "../../../store/date-slice";

const Filters = props => {
    const eventsState = useSelector(state => state.event.eventData)

    const dispatch = useDispatch()
    let events = []
    if (eventsState)
    {
        if (eventsState.payload['count']){
            console.log(1)
            events = [...eventsState.payload.results]
        } else {
            console.log(1)
            events = [...eventsState.payload]
        }    }

    const typesState = [
        {label: 'Благотворительное', type: 'charity', id:1},
        {label: 'Развлекательное', type: 'entertainment', id:2},
        {label: 'Образовательное', type: 'educational', id: 3},
        {label: 'Спортивное', type: 'sports', id: 4},
        {label: 'Творческое', type: 'creative', id: 5}
    ];

    const isSelected = useSelector(state => state.eventType.acceptTypes)
    console.log(isSelected)
    // if (!isSelected) {
    //         dispatch(eventsActions.setActiveEvents(events))
    //     }
    useEffect(() => {
        dispatch(eventsActions.setActiveEvents(events))

    }, [isSelected])
    const isPicked = useSelector(state => state.date.isPicked)
    const start = useSelector(state => state.date.start_date.payload)
    const end = useSelector(state => state.date.end_date.payload)
    const chosenEvents = useSelector(state => state.event.activeEvents)
    const myTypes = useSelector(state => state.eventType.selectedTypes)
    console.log(myTypes)


    console.log(chosenEvents)

    const toggleClose = () => {
        dispatch(eventsActions.setActiveEvents(events))
        dispatch(dateActions.setTurnOff())
    }
    console.log(isPicked)
    return (
        <div className={classes.filters}>
            { isPicked &&
                <div><FilterData
                        accepted={props.accepted}
                        close_date={toggleClose}
                        start={start}
                        end={end}
                    /></div>}
            {isSelected ? typesState.map(item =>
                (props.isSelected[item.type] && !props.update) &&
                    <div><Filter
                        label={item.label}
                        close={() => props.closeFilter(item.type)}
                        accepted={props.accepted}
                    /></div>):null}
        </div>
    )
}

export default Filters;