import React from 'react'

import classes from './EventBlock.module.css'
import EventParticipants from "../EventParticipants/EventParticipants";
import calendar from '../../../assets/calendarEventBlock.png'
import placeImg from '../../../assets/bi_geo-alt.png'
import one from '../../../assets/oneP.png'
import two from '../../../assets/twoP.png'
import {useSelector} from "react-redux";
import moment from "moment";


const EventBlock = props => {
    const allEvents = useSelector(state => state.event.allEvents)
    console.log(allEvents)
    let events = []
    let thisEvent = []

    if (allEvents) {
        if (allEvents.payload['count']){
            console.log(1)
            events = [...allEvents.payload.results]
            thisEvent = events.find((item) => item.id === Number(props.id)
        )
        } else {
            console.log(1)
            events = [...allEvents.payload]
            thisEvent = events.find((item) => item.id === Number(props.id)
        )
        }
    }
    console.log(events)
    return (
        <div className={classes.eventBlock}>
            <div className={classes.hashtag}>#{thisEvent.type_id}</div>
            <div className={classes.name}>{thisEvent.name}</div>
            <div className={classes.date}>
                <img src={calendar} alt=""/>
                <div>С {moment(thisEvent.start_date).format('DD MMM')} по {moment(thisEvent.end_date).format('DD MMM')}</div>
                <div className={classes.dot}/>
                <div>{moment(thisEvent.start_date).format('HH:mm')} - {moment(thisEvent.end_date).format('HH:mm')}</div>
            </div>
            <div className={classes.place}>
                <img src={placeImg} alt=""/>
                <div>{thisEvent.place}</div>
            </div>
            <div className={classes.textBlock}>
                Не следует, однако, забывать о том, что постоянное информационно-техническое
                обеспечение нашей деятельности обеспечивает актуальность системы обучения кадров,
                соответствующей насущным потребностям. Дорогие друзья, курс на социально-ориентированный
                национальный проект влечет за собой процесс внедрения и модернизации соответствующих
                условий активизации?
            </div>
            <button className={classes.eventButton}>Пойду</button>
            <button className={classes.planButton}>План мероприятия</button>
            <div className={classes.participantsText}>На меро пойдут:</div>
            <div className={classes.eventParticipants}>
                <EventParticipants><img src={one} alt=""/></EventParticipants>
                <EventParticipants><img src={two} alt=""/></EventParticipants>
            </div>
        </div>
    )
}

export default EventBlock;