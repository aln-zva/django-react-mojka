import React, {useState} from 'react'
import moment from 'moment'
import 'moment/locale/ru'
import classes from "./Calendar.module.css";
import arrowLeft from "../../../../../assets/datePicker arrowLeft.png";
import arrowRight from "../../../../../assets/datePicker arrowRight.png";
import classNames from "classnames/bind";
import reset from '../../../../../assets/datePickerReset.png'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {eventsActions} from "../../../../../store/events-slice";
import {togglePeriodActions} from "../../../../../store/toggle-period-slice";
import {dateActions} from "../../../../../store/date-slice";

const Heading = ({date, changeMonth, resetDate}) => (
    <nav className={classes.nav}>
        <a onClick={() => changeMonth(date.month() - 1)}><img src={arrowLeft} alt=""/></a>
        <div onClick={() => resetDate()}>{date.format('MMMM')} {date.format('YYYY')}</div>
        <a onClick={() => changeMonth(date.month() + 1)}><img src={arrowRight} alt=""/></a>
    </nav>
);

let cx = classNames.bind(classes);

const Day = ({currentDate, date, startDate, endDate, onClick}) => {
    let className = cx({
        active: moment().isSame(date, 'day'),
        start: date.isSame(startDate, 'day'),
        between: date.isBetween(startDate, endDate, 'day'),
        end: date.isSame(endDate, 'day'),
        muted: ! date.isSame(currentDate, 'month'),
    });

    return (
        <span onClick={() => onClick(date)} currentDate={date} className={className}>{date.date()}<div/></span>
    )
};

const Days = ({date, startDate, endDate, onClick}) => {
    const thisDate = moment(date);
    const daysInMonth = moment(date).daysInMonth();
    const firstDayDate = moment(date).startOf('month');
    const previousMonth = moment(date).subtract(1, 'month');
    const previousMonthDays = previousMonth.daysInMonth();
    const nextsMonth = moment(date).add(1, 'month');
    let days = [];
    let labels = [];

    for (let i = 1; i <= 7; i++) {
        labels.push(<span className={classes.label}>{moment().day(i).format('ddd')}</span>);
    }

    //если месяц не с понедельника, то пушим дни предыдущего месяца
    for (let i = firstDayDate.day(); i > 1; i--) {
        previousMonth.date(previousMonthDays - i + 2);

        days.push(
            <Day
                key={moment(previousMonth).format('DD MM YYYY')}
                onClick={(date) => onClick(date)}
                currentDate={date} date={moment(previousMonth)}
                startDate={startDate} endDate={endDate}
            />
        );
    }

    for (let i = 1; i <= daysInMonth; i++) {
        thisDate.date(i);

        days.push(
            <Day
                key={moment(thisDate).format('DD MM YYYY')}
                onClick={(date) => onClick(date)}
                currentDate={date} date={moment(thisDate)}
                startDate={startDate} endDate={endDate} />
        );
    }

    const daysCount = days.length;
    for (let i = 1; i <= (42 - daysCount); i++) {
        nextsMonth.date(i);
        days.push(
            <Day
                key={moment(nextsMonth).format('DD MM YYYY')}
                onClick={(date) => onClick(date)}
                currentDate={date}
                date={moment(nextsMonth)}
                startDate={startDate} endDate={endDate} />
        );
    }

    return (
        <nav className={classes.days}>
            {labels.concat()}
            {days.concat()}
        </nav>
    );
};

const Calendar = (props) => {
    const stateData = {
            date: moment().locale("ru"),
            startDate: moment().subtract(0, 'day'),
            endDate: moment().add(0, 'day'),
            nextMonth: moment().add(1, "month")
        };

    const [data, setData] = useState(stateData)

    const dispatch = useDispatch()
    const eventsState = useSelector(state => state.event.eventData)
    const chosenEvents = useSelector(state => state.event.activeEvents)
    const isSelected = useSelector(state => state.eventType.acceptTypes)
    const myTypes = useSelector(state => state.eventType.selectedTypes)
    const isPicked = useSelector(state => state.date.isPicked)

    let events = []
    if (eventsState)
    {
        events = [...eventsState.payload.results]
    }

    const resetDate = () => {
        setData({...data,
            date: moment().locale("ru"),
            nextMonth: moment().add(1, "month")
        });
    }

    const changeMonth = (month) => {
        const date = data["date"];

        date.month(month);

        setData({...data,
            date:date}
        );
    }

    const changeNextMonth = (month) => {
        const nextMonth = data["nextMonth"];

        nextMonth.month(month);

        setData({...data,
            nextMonth:nextMonth}
        );
    }

    const resetDateAndMonth = () => {
        setData({
            date: moment().locale("ru"),
            startDate: moment().subtract(0, 'day'),
            endDate: moment().add(0, 'day'),
            nextMonth: moment().add(1, "month")
        });
        dispatch(eventsActions.setActiveEvents(events))
        dispatch(togglePeriodActions.togglePeriod())
        dispatch(dateActions.setTurnOff())
    }
        console.log(isPicked)


    const changeDate = (date) => {
        let startDate = data["startDate"];
        let endDate = data["endDate"]

        if (startDate === null || date.isBefore(startDate, 'day') || ! startDate.isSame(endDate, 'day')) {
            startDate = moment(date);
            endDate = moment(date);
        } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
            startDate = null;
            endDate = null;
        } else if (date.isAfter(startDate, 'day')) {
            endDate = moment(date);
        }

        setData({...data,
            startDate: startDate,
            endDate: endDate
        });
    }

    const filterByData = () => {
        const start_date = data["startDate"].format('YYYY-MM-DD')
        const end_date = data["endDate"].format('YYYY-MM-DD')
        const start = data["startDate"].format('DD MMM')
        const end = data["endDate"].format('DD MMM')

        dispatch(dateActions.setStartDate(start))
        dispatch(dateActions.setEndDate(end))

        console.log(start.payload)

        if (chosenEvents !==null && isSelected) {
            if (chosenEvents.payload.length > 0) {
                let id = []
                myTypes.payload.map (type => id.push(type.id))
                let str = id.join('')
                console.log(str)
                const eventsUrl = `http://localhost:8000/events/?type_id=${str}&start_date=${start_date}&end_date=${end_date}`
                axios.get(eventsUrl).then((resp) => {
                    const selectedEvents = resp.data;
                    console.log(selectedEvents)
                    dispatch(eventsActions.setActiveEvents(selectedEvents))
                });
            }
        } else if(events) {
            const eventsUrl = `http://localhost:8000/events/?start_date=${start_date}&end_date=${end_date}`
            axios.get(eventsUrl).then((resp) => {
                const selectedEvents = resp.data;
                console.log(selectedEvents)
                dispatch(eventsActions.setActiveEvents(selectedEvents))
            });
        }
        dispatch(togglePeriodActions.togglePeriod());
        dispatch(dateActions.togglePicker())
    }

        return (
            <div className={classes.calendarContainer}>
                <div className={classes.main}>
                    <div className={classes.calendar}>
                        <Heading date={data["date"]}
                                 changeMonth={(month) => changeMonth(month)}
                                 resetDate={() => resetDate()}
                        />
                        <Days onClick={(date) => changeDate(date)}
                              date={data["date"]} startDate={data["startDate"]}
                              endDate={data["endDate"]} />
                    </div>
                    <div className={classes.calendar}>
                        <Heading date={data["nextMonth"]}
                                 changeMonth={(month) => changeNextMonth(month)}
                                 resetDate={() => resetDate()} />
                        <Days onClick={(date) => changeDate(date)}
                              date={data["nextMonth"]} startDate={data["startDate"]}
                              endDate={data["endDate"]} />
                    </div>
                </div>
                <div className={classes.buttonsDiv}>
                    <button className={classes.reset} onClick={() => resetDateAndMonth()}>
                        <img src={reset} alt=""/>Сбросить</button>
                    <button className={classes.accept} onClick={filterByData}>Применить</button>
                </div>
            </div>
        )
    // }
}

export default Calendar;