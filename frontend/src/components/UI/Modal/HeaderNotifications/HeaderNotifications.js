import React from 'react'

import classes from './HeaderNotifications.module.css'
import Notification from "./Notification/Notification";

const HeaderNotifications = () => {
    return (
        <div className={classes.notificationsBlock}>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
            <Notification/>
        </div>
    )
}

export default HeaderNotifications;