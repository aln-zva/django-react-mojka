import React from 'react'

import classes from './TypeComponent.module.css'
import classNames from "classnames/bind";

let cx = classNames.bind(classes);

const TypeComponent = props => {
    let className = cx({
        checkbox: !props.chosen,
        checkboxClicked: props.chosen
    });

    return (
        <div className={classes.type}>
            <button className={className} onClick={props.clicked}/>
            <div className={classes.typeName}>{props.label}</div>
        </div>
    )
}

export default TypeComponent;