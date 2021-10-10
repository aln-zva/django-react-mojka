import React from 'react'

import classes from './EventPreviewCard.module.css'
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import moment from "moment";
import 'moment/locale/ru'


const EventPreviewCard = props => {
    const dispatch = useDispatch()

    return (
        <div className={classes.main}>
            <div className={classes.eventCard}>
                <img src={props.image} alt="" className={classes.eventCardImg}/>
                <div className={classes.hashtag}>#{props.type}</div>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.timestamp}>
                    <div className={classes.date}>
                        c {moment(props.start_date).format('DD MMM')} по {moment(props.end_date).format('DD MMM')}
                    </div>
                    <div className={classes.time}>
                        {moment(props.start_date).format('HH:mm')} - {moment(props.end_date).format('HH:mm')}
                    </div>
                </div>
                <Link to={`/event/${props.id}`} className={classes.eventCardButton} onClick={() => props.open()}>Пойду</Link>
            </div>
        </div>
    )
}

export default EventPreviewCard;