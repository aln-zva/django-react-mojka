import React from 'react'

import classes from './ProfileNotifications.module.css'
import notification from '../../../assets/notifImg.png'

const ProfileNotifications = props => {
    return (
        <div className={classes.profileNotifications}>
            <div className={classes.subject}>Привет, Бончевец!</div>
            <div className={classes.message}>Круто, что ты присоединился
                и зарегался на море крутых меро, мы тебя ждем!</div>
            <img src={notification} alt=""/>
        </div>
    )
}

export default ProfileNotifications;