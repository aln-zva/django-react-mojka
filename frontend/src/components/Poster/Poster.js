import React, {useEffect, useState} from 'react'

import classes from './Poster.module.css'
import Search from './Search/Search'
import Type from "./Type/Type";
import Period from "./Period/Period";
import Filters from "./Filters/Filters";
import EventsPreviews from "./EventPreviews/EventsPreviews";
import Pagination from "../UI/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {eventTypesActions} from "../../store/eventType-slice";
import axios from "axios";
import {eventsActions} from "../../store/events-slice";
import {togglePeriodActions} from "../../store/toggle-period-slice";

const Poster = props => {

    const dispatch = useDispatch();
    const eventTypes = useSelector(state => state.eventType.typesState)

    const typesState = {
        charity: false,
        entertainment: false,
        educational: false,
        sports: false,
        creative: false
    };

    const components = {
        showDatePicker: false,
        showTypeMenu: false,
        showFilter: false
    }
    //перенести в контейнеры

    const [showComponents, setShowComponents] = useState(components); // для кнопки показа меню типов меро
    const [types, setType] = useState(typesState);
    const [updateFilter, setUpdateFilter] = useState(false)
    const activeTypes = useSelector(state => state.eventType.activeTypes)
    const [acceptSelectedTypes, setAcceptSelectedTypes] = useState(false);
    const isSelected = useSelector(state => state.eventType.acceptTypes)
    const start = useSelector(state => state.date.start_date.payload)
    const end = useSelector(state => state.date.end_date.payload)


    const selectTypeHandler = (type) => {
        const oldState = types[type];
        const updatedTypes = {...types};
        updatedTypes[type] = !oldState;
        setType(updatedTypes);
        // setAcceptSelectedTypes(false)
    }

    console.log(acceptSelectedTypes)
    const [eventArrSize, setEventArrSize] = useState(0)
    const arrAmount = (n) => {
        setEventArrSize(n)
    }

    useEffect(() => {
        dispatch(eventTypesActions.setActive(types))
    }, [types])

    console.log(activeTypes)
    const togglePeriod = useSelector(state => state.period.toShow)
    console.log(togglePeriod)
    const toggleDatePickerHandler = (event) => {
        const updatedComponents = {...showComponents};
        updatedComponents["showDatePicker"] = !showComponents["showDatePicker"];
        setShowComponents(updatedComponents);
        dispatch(togglePeriodActions.togglePeriod())
    }

    const toggleTypeEventHandler = () => {
        const updatedComponents = {...showComponents};
        updatedComponents["showTypeMenu"] = !showComponents["showTypeMenu"];
        setShowComponents(updatedComponents);
    }

    let typesChosen = false;

    const acceptSelectedTypesHandler = () => {
        const updatedComponents = {...showComponents};
        updatedComponents["showTypeMenu"] = false;
        setShowComponents(updatedComponents);
        typesChosen = false
        for (let key in types) {
            if (types[key])
            {
                typesChosen = true;
            }
        }
        if (typesChosen)
        {
            setAcceptSelectedTypes(true);
        } else (setAcceptSelectedTypes(false))
        if (activeTypes) {
            console.log(activeTypes.payload)
        }
    }

    const myTypes = useSelector(state => state.eventType.selectedTypes)
    console.log(myTypes)

    //for search
    const eventState = useSelector(state => state.event.eventData)
    const chosenEvents = useSelector(state => state.event.activeEvents)

    let events = []
    let id = []
    let str = ''
    console.log(myTypes)
    if (myTypes.length > 0) {
        myTypes.payload.map (type => id.push(type.id))
        str = id.join('')
        console.log(str)
    }
    const [value, setValue] = useState(" ")
    // let filteredEvents = []
    console.log(eventState)

    const onChangeSearchHandler = (event) => {
        setValue(event.target.value)
    }

    const searchHandler = (event) => {
        if (eventState) {
            if (eventState.payload['count']){
            console.log(1)
            events = [...eventState.payload.results]
        } else {
            console.log(1)
            events = [...eventState.payload]
        }        }
        // events.filter(e =>
        //     console.log(e.name.toLowerCase().includes(value.toLowerCase()))
        // )
        console.log(value)
        // const eventsUrl = `http://127.0.0.1:8000/events/?&search=${value}`
        //     axios.get(eventsUrl).then((resp) => {
        //         const selectedEvents = resp.data;
        //         console.log(selectedEvents)
        //         dispatch(eventsActions.setActiveEvents(selectedEvents))})
        console.log(chosenEvents)
        if (chosenEvents !== null){
            console.log(1)
            if ((chosenEvents.payload.length > 0 || isSelected) && isPicked) {
                console.log(str)
                const eventsUrl = `http://localhost:8000/events/?search=${value}&type_id=${str}&start_date=${start}&end_date=${end}`
                axios.get(eventsUrl).then((resp) => {
                    const selectedEvents = resp.data;
                    console.log(selectedEvents)
                    dispatch(eventsActions.setActiveEvents(selectedEvents))
                });
            } else if (chosenEvents.payload.length > 0 && isSelected && !isPicked) {
                console.log(3)

                const eventsUrl = `http://localhost:8000/events/?type_id=${str}&search=${value}`
                axios.get(eventsUrl).then((resp) => {
                    const selectedEvents = resp.data;
                    console.log(selectedEvents)
                    dispatch(eventsActions.setActiveEvents(selectedEvents))
                })
            } else if (value === '' && !isSelected) {
                console.log(5)
                console.log(events)
                dispatch(eventsActions.setActiveEvents(events))
            }
        }
        else if (!chosenEvents && !isSelected) {
                console.log(4)

                console.log(value)
                const eventsUrl = `http://localhost:8000/events/?&search=${value}`
                axios.get(eventsUrl).then((resp) => {
                    const selectedEvents = resp.data;
                    console.log(selectedEvents)
                    dispatch(eventsActions.setActiveEvents(selectedEvents))
                })
            }
        const eventsUrl = `http://localhost:8000/events/?&search=${value}`
                axios.get(eventsUrl).then((resp) => {
                    const selectedEvents = resp.data;
                    console.log(selectedEvents)
                    dispatch(eventsActions.setActiveEvents(selectedEvents))
                })
    }
            // dispatch(eventsActions.setEvents(events))
        console.log(chosenEvents)

    //for pagination
    const eventsCount = useSelector(state => state.event.totalEventCount.payload)
    const pageSize = useSelector(state => state.event.pageSize)
    const eventsOnPage = useSelector(state => state.event.eventPages)
    const isPicked = useSelector(state => state.date.isPicked)


    let pagesCount = Math.ceil(eventsCount/pageSize)
    const currentPage = useSelector(state => state.event.currentPage)

    const [eventPage, setEventPage] = useState({events:null})
    useEffect(()=>{
        // const eventsUrl = `http://localhost:5000/events?page=${currentPage}&limit=${pageSize}`
        const eventsUrl = 'http://localhost:8000/events'
        axios.get(eventsUrl).then((resp) => {
        const eventsOnPage = resp.data;
        setEventPage({
            events: eventsOnPage,
        });
        dispatch(eventsActions.setEventPages(eventsOnPage));
        });
    }, [setEventPage, currentPage])

    const resetHandler = () => {
        setValue('')
        dispatch(eventsActions.setActiveEvents(events))
        dispatch(eventTypesActions.setActive(typesState))
    }

    return (
        <div className={classes.poster} id={props.id}>
            <div className={classes.poster_head}>Меро</div>
            <div className={classes.posterFilterBlock}>
                <Search search={searchHandler} onchange={onChangeSearchHandler}/>
                <Type
                    doesShow={showComponents["showTypeMenu"]}
                    clicked={toggleTypeEventHandler}
                    selected={selectTypeHandler}
                    isSelected={types}
                    typesAccept={acceptSelectedTypesHandler}
                />
                <Period
                    doesShow={showComponents["showDatePicker"]}
                    clicked={toggleDatePickerHandler}
                />
            </div>
            {isSelected || isPicked ? (<Filters
                update={updateFilter}
                isSelected={types}
                closeFilter={selectTypeHandler}
                accepted={acceptSelectedTypes}
            />) : null}
            <EventsPreviews amount={arrAmount} accepted={acceptSelectedTypes} reset={resetHandler}/>
            <div className={classes.pagination}>
                <Pagination pageSize={pageSize}/>
            </div>
        </div>
    )
}

export default Poster;