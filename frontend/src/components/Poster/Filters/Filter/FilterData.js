import React from 'react'

import classes from './Filter.module.css'
import close from '../../../../assets/closeType.png'

const FilterData = props => {
    console.log(props.start)

    return (
        <div className={classes.main}>
            <div className={classes.filter}>
                <div className={classes.text}>c {String(props.start)} по {props.end}
                <img src={close} alt="" onClick={props.close_date}/></div>
            </div>
        </div>
    )
}

export default FilterData;