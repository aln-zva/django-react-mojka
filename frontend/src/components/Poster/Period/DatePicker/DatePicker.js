import React, {useState} from 'react'

import classes from './DatePicker.module.css'
import Calendar from "./Calendar/Calendar";
import moment from "moment";
import {useSelector} from "react-redux";

const DatePicker = props => {

    return (
        <div className={classes.datePicker}>
            <div className={classes.choseDatesText}>Выберите даты мероприятий</div>
            <Calendar/>
        </div>
    )
}

export default DatePicker;