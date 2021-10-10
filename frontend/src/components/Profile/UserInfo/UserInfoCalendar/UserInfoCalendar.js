import React from 'react'
import moment from 'moment'
import 'moment/locale/ru'
import leftArrow from '../../../../assets/CalendarArrowL.png'
import rightArrow from '../../../../assets/CalendarArrowR.png'
import classNames from "classnames/bind";

import classes from './UserInfoCalendar.module.css'

const Heading = ({date, changeMonth, resetDate}) => (
    <nav className={classes.nav}>
        <a onClick={() => changeMonth(date.month() - 1)}><img src={rightArrow} alt=""/></a>
        <div onClick={() => resetDate()}>{date.format('MMMM')} {date.format('YYYY')}</div>
        <a onClick={() => changeMonth(date.month() + 1)}><img src={leftArrow} alt=""/></a>
    </nav>
);

let cx = classNames.bind(classes);

const Day = ({currentDate, date, startDate, endDate, onClick}) => {
    let selectedDate = moment('2021-05-20');
    let className = cx({
        active: moment().isSame(date, 'day'),
        // start: date.isSame(startDate, 'day'),
        // between: date.isBetween(startDate, endDate, 'day'),
        // end: date.isSame(endDate, 'day'),
        muted: ! date.isSame(currentDate, 'month'),
        selectedDay: date.isSame(selectedDate, 'day'),
    });

    // let selectStyle = '';
    // if (date.isSame(selectedDate, 'day'))
    // {
    //     selectStyle += classes.selectedDay;
    // }

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
    for (let i = 1; i <= (35 - daysCount); i++) {
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

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: moment().locale("ru"),
            startDate: moment().subtract(5, 'day'),
            endDate: moment().add(3, 'day')
        };
    }

    resetDate() {
        this.setState({
            date: moment().locale("ru")
        });
    }

    changeMonth(month) {
        const {date} = this.state;

        date.month(month);

        this.setState(
            date
        );
    }

    changeDate(date) {
        let {startDate, endDate} = this.state;

        if (startDate === null || date.isBefore(startDate, 'day') || ! startDate.isSame(endDate, 'day')) {
            startDate = moment(date);
            endDate = moment(date);
        } else if (date.isSame(startDate, 'day') && date.isSame(endDate, 'day')) {
            startDate = null;
            endDate = null;
        } else if (date.isAfter(startDate, 'day')) {
            endDate = moment(date);
        }

        this.setState({
            startDate,
            endDate
        });
    }

    render() {
        const {date, startDate, endDate} = this.state;

        return (
            <div className={classes.calendar}>
                <Heading date={date} changeMonth={(month) => this.changeMonth(month)} resetDate={() => this.resetDate()} />

                <Days onClick={(date) => this.changeDate(date)} date={date} startDate={startDate} endDate={endDate} />
            </div>
        );
    }
}

export default Calendar;