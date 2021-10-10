import React from 'react'

import classes from './UserInfoPersonal.module.css'

const UserInfoPersonal = props => {
    return (
        <div className={classes.infoPart}>
            <img src={props.img} alt=""/>
            <div>{props.children}</div>
        </div>
    )
}

export default UserInfoPersonal;
