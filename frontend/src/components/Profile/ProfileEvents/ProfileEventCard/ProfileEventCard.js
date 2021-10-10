import React from 'react'

import classes from './ProfileEventCard.module.css'
import calendar from '../../../../assets/calendarEventBlock.png'
import placeImg from '../../../../assets/bi_geo-alt.png'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pagesAction} from "../../../../store/pages-state-slice";
import moment from "moment";

const ProfileEventCard = props => {
    const dispatch = useDispatch()

    const openEventPage = () => {
        dispatch(pagesAction.toggleEvent())
    }

    return (
        <div className={classes.eventCard} >
            <Link to={`/event/${props.id}`} className={classes.link} onClick={() => props.open()}>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.date}>
                    <img src={calendar} alt=""/>
                    <div>C {moment(props.start_date).format('DD MMM')} по {moment(props.end_date).format('DD MMM')}</div>
                    <div className={classes.dot}/>
                    <div>{moment(props.start_date).format('HH:mm')} - {moment(props.end_date).format('HH:mm')}</div>
                </div>
                <div className={classes.place}>
                    <div className={classes.imagePlace}><img src={placeImg} alt=""/></div>
                    <div>{props.place}</div>
                </div>
            </Link>
        </div>
    )
}

export default ProfileEventCard;