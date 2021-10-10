import React, {Fragment} from 'react'

import classes from './NewsLetter.module.css'
import classNames from "classnames/bind";

let cx = classNames.bind(classes);

const NewsLetter = props => {

    let className = cx({
        typeButton: !props.doesShow,
        clicked: props.doesShow
    });

    return (
        <Fragment>
            {props.state ? (
                <div className={classes.letter} onClick={props.clicked}>
                    <div className={classes.lineBlock}>
                        <div className={classes.line}/>
                        <div className={classes.line2}/>
                        <div className={classes.line_blur}/>
                    </div>
                    <div className={classes.text}>
                    {props.subject}
                    </div>
                </div>)
            : (<div className={classes.letterNotActive} onClick={props.clicked}>
                    <div className={classes.notActiveLine}/>
                    <div className={classes.text}>
                            {props.subject}
                        </div>
                    </div>)}
        </Fragment>
    )
}

export default NewsLetter;