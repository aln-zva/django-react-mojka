import React from 'react'

import classes from './ProfileFeedbackCard.module.css'
import line from '../../../../assets/Ellipse 136.png'
import classNames from "classnames/bind";

const cx = classNames.bind(classes);

const ProfileFeedbackCard = props => {
    const openFeedbackForm = () => {
        window.open (props.link);
    }
    const sizeOfNameState = props.name.length < 12

    let classNames = cx({
        name: sizeOfNameState,
        nameSmaller: !sizeOfNameState
    });

    return (
        <div className={classes.feedbackCard} onClick={openFeedbackForm}>
                <div className={classes.feedbackText}>Обратная связь</div>
                <img src={line} alt="" className={classes.line}/>
                <div className={classNames}>{props.name}</div>
        </div>
    )
}

export default ProfileFeedbackCard;