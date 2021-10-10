import React from 'react'

import classes from './Period.module.css'
import classNames from "classnames/bind";
import {useSelector} from "react-redux";
import Calendar from "./DatePicker/Calendar/Calendar";

let cx = classNames.bind(classes);

const Period = props => {
    const isPicked = useSelector(state => state.date.isPicked)
    const togglePeriod = useSelector(state => state.period.toShow)


    let className = cx({
        periodButton: !togglePeriod,
        clickedButton: togglePeriod
    });

    return (
        <div className={classes.period}>
            <button onClick={props.clicked} className={className}>Период</button>
            {
                togglePeriod ? (
                    <div className={classes.datePicker}>
                        <div className={classes.choseDatesText}>Выберите даты мероприятий</div>
                        <Calendar/>
                    </div>) : null
            }
        </div>
    )
}

export default Period;