import React from 'react'

import classes from './EventParticipants.module.css'

const EventParticipants = props => {
    return (
        <div className={classes.eventParticipants}>
            {props.children}
        </div>
    )
}

export default EventParticipants;