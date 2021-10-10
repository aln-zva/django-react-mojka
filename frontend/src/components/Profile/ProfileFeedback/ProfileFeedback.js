import React from 'react'

import classes from './ProfileFeedback.module.css'
import ProfileFeedbackCard from "./ProfileFeedbackCard/ProfileFeedbackCard";
import {useSelector} from "react-redux";

const ProfileFeedback = props => {
    const eventsState = useSelector(state => state.event.eventData)
    let events = []

    if (eventsState) {
        if (eventsState.payload['count']){
            console.log(1)
            events = [...eventsState.payload.results]}
        else {
            console.log(1)
            events = [...eventsState.payload]}    }

    return (
        <div className={classes.profileFeedback}>
            {events.map(item =>
                item.feedback !== String(null) ? <ProfileFeedbackCard
                    key={item.id}
                    name={item.name}
                    link={item.feedback}
                /> : null
            )}
                {/*<ProfileFeedbackCard name="Одиннадцать" url="https://forms.gle/nTy3hC6LwsUtfiaQ6"/>*/}
                {/*<ProfileFeedbackCard name="ИграЦентр" url="https://forms.gle/KtpnqNR2JC4ezNjK7"/>*/}
                {/*<ProfileFeedbackCard name="Альтернативные игры" url="https://forms.gle/nTy3hC6LwsUtfiaQ6"/>*/}
                {/*<ProfileFeedbackCard name="Golden LIKE" url="https://forms.gle/nTy3hC6LwsUtfiaQ6"/>*/}
        </div>
    )
}

export default ProfileFeedback;