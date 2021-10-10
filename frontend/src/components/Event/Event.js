import React from 'react'

import classes from './Event.module.css'
import EventBlock from "./EventBlock/EventBlock";
import EventPosterBlock from "./EventPosterBlock/EventPosterBlock";
import EventPreviewCard from "../Poster/EventPreviews/EventPreviewCard/EventPreviewCard";
import left from '../../assets/left.png'
import right from '../../assets/rightActive.png'
import {Link} from "react-router-dom";
import {pagesAction} from "../../store/pages-state-slice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import axios from "axios";
import {eventsActions} from "../../store/events-slice";
import moment from "moment";

const Event = props => {
    const dispatch = useDispatch()
    const params = useParams()

    const openMainPage = () => {
        dispatch(pagesAction.toggleMain())
    }

    const eventsState = useSelector(state => state.event.eventData)
    let events = []
    let otherEvents = []
    let thisEvent = []

    if (eventsState) {
        if (eventsState.payload['count']){
            console.log(1)
            events = [...eventsState.payload.results]
            otherEvents = events.filter((item) => item.id !== Number(params.eventId) && moment(item.start_date).month() === moment().month())
            thisEvent = events.find((item) => item.id === Number(params.eventId))
            dispatch(eventsActions.setCurrent(thisEvent))
        } else {
            events = [...eventsState.payload]
            otherEvents = events.filter((item) => item.id !== Number(params.eventId) && moment(item.start_date).month() === moment().month())
            // otherEvents = otherEvents.filter(item => moment(thisEvent.start_date).month() === moment().month())
        }
    }
    console.log(thisEvent.main_photo)

    const openEventPage = (id) => {
        dispatch(pagesAction.toggleEvent())
        const eventsUrl = 'http://localhost:8000/events_all'
        axios.get(eventsUrl).then((resp) => {
            const allEvents = resp.data;
            console.log(allEvents)
            dispatch(eventsActions.setAll(allEvents.results));
        })

    }


    return (
        <div className={classes.event}>
            <div className={classes.navigation}>
                <Link to='/main-page' className={classes.page} onClick={openMainPage}>Главная</Link>
                <div className={classes.line}/>
                <a href="" className={classes.onPage}>Мероприятие</a>
            </div>
            <div className={classes.info}>
                <EventBlock id={params.eventId}/>
                <EventPosterBlock main_photo={thisEvent.main_photo} id={params.eventId}/>
            </div>
            <div className={classes.monthEvents}>Мероприятия этого месяца</div>
            <div className={classes.eventCardsBlock}>
                <div className={classes.left}><img src={left} alt=""/></div>
                <div className={classes.eventCards}>
                    {otherEvents.map((item) =>
                    <EventPreviewCard
                        id={item.id}
                        name={item.name}
                        type={item.type_id}
                        start_date={item.start_date}
                        end_date={item.end_date}
                        image={item.main_photo}
                        open={() => openEventPage(item.id)}
                    />
                )}
                </div>
                <div className={classes.right}><img src={right} alt=""/></div>
            </div>
        </div>
    )
}

export default Event;