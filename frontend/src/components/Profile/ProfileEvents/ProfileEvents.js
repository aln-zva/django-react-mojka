import React from 'react'

import classes from './ProfileEvents.module.css'
import ProfileEventCard from "./ProfileEventCard/ProfileEventCard";
import {useDispatch, useSelector} from "react-redux";
import {pagesAction} from "../../../store/pages-state-slice";
import axios from "axios";
import {eventsActions} from "../../../store/events-slice";

const ProfileEvents = props => {
    const dispatch = useDispatch()
    const eventsState = useSelector(state => state.event.eventData)
    let events = []
    if (eventsState) {
        if (eventsState.payload['count']){
            console.log(1)
            events = [...eventsState.payload.results]}
        else {
            console.log(1)
            events = [...eventsState.payload]}
        }
    console.log(events.map(item => console.log(item.id)))

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
        <div className={classes.profileEvents}>
            <div className={classes.futureEventText}>Предстоящие меро</div>
            <div className={classes.userEvents}>
                {events && events.map(item =>
                    <ProfileEventCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        start_date={item.start_date}
                        end_date={item.end_date}
                        place={item.place}
                        open={openEventPage}
                    />
                )}
            </div>

        </div>
    )
}

export default ProfileEvents;