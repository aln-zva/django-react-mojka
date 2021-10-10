import React, {useState, Fragment} from 'react'

import classes from './Notification.module.css'
import close from '../../../../../assets/closeEditButton.png'
import classNames from "classnames/bind";

let cx = classNames.bind(classes);


const Notification = () => {
    const [toShowNotification, setToShowNotification] = useState(true);
    const [isRead, setIsRead] = useState(false);
    const toggleNotification = () => {
        setToShowNotification(false);
    }

    const isReadHandler = () => {
        setIsRead(true);
    }

    let className = cx({
        notificationActive: !isRead ,
        notificationRead: isRead
    });

    return (
        <Fragment>
            {toShowNotification ? (<div className={classes.notification}>
                <div className={classes.notificationContent}>
                    <div className={classes.notificationHead}>
                        <div className={className}/>
                        <div className={classes.notificationName}>Очень длинное название</div>
                        <img src={close} alt="" onClick={toggleNotification}/>
                    </div>
                    <div className={classes.notificationText} onClick={isReadHandler}>
                        Привет! К сожалению, мероприятие переносится на 25.06
                    </div>
                </div>
                <div className={classes.notificationBorder}/>
            </div>) : null}
        </Fragment>
    )
}

export default Notification;