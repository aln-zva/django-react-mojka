import React from 'react'

import classes from './Filter.module.css'
import close from '../../../../assets/closeType.png'

const Filter = props => {
    return (

        <div className={classes.main}>
            <div className={classes.filter}>
                <div className={classes.text}>{props.label} <img src={close} alt="" onClick={props.close}/></div>
            </div>
        </div>
    )
}

export default Filter;