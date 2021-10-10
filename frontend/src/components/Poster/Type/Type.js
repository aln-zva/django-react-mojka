import React, {useEffect, useState} from 'react'

import classes from './Type.module.css'
import classNames from "classnames/bind";
import TypeComponent from "./TypeComponent/TypeComponent";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {eventsActions} from "../../../store/events-slice";
import {eventTypesActions} from "../../../store/eventType-slice";

let cx = classNames.bind(classes);

const Type = props => {
    const dispatch = useDispatch()

    const typesState = [
        {label: 'Благотворительное', type: 'charity', id:1},
        {label: 'Развлекательное', type: 'entertainment', id:2},
        {label: 'Образовательное', type: 'educational', id: 3},
        {label: 'Спортивное', type: 'sports', id: 4},
        {label: 'Творческое', type: 'creative', id: 5}
    ];

    let className = cx({
        typeButton: !props.doesShow,
        clicked: props.doesShow
    });

    const activeTypes = useSelector(state => state.eventType.activeTypes)
    const myTypes = useSelector(state => state.eventType.selectedTypes)
    console.log(activeTypes)

    let selectedTypes = []
    if(activeTypes){
        selectedTypes = typesState.filter(type => activeTypes.payload[type.type])
        console.log(selectedTypes)
    }

    const toggleAccept = () => {
        if (selectedTypes.length > 0) {
            let id = []
            selectedTypes.map (type => id.push(type.id))
            let str = id.join('')
            const eventsUrl = `http://localhost:8000/events/?type_id=${str}`
            axios.get(eventsUrl).then((resp) => {
                const selectedEvents = resp.data;
                console.log(selectedEvents)
                dispatch(eventsActions.setActiveEvents(selectedEvents))
            });
            console.log(1)
            dispatch(eventTypesActions.setSelected(selectedTypes))
            console.log(myTypes)
        }
        props.typesAccept()//чтобы закрыть окно меню
    }

    if(selectedTypes.length === 0) {
        dispatch(eventTypesActions.setNoTypes())
    } else if(selectedTypes.length > 0) {
        dispatch(eventTypesActions.setAccept())
    }

    return (
        <div className={classes.type}>
            <button onClick={props.clicked} className={className}>Тип меро</button>
            {
                props.doesShow ? (<div className={classes.typeMenu}>
                    {typesState.map(type => (
                        <TypeComponent
                            label={type.label}
                            clicked={() => props.selected(type.type)}
                            chosen={props.isSelected[type.type]}
                        />
                    ))}
                    <button className={classes.accept} onClick={toggleAccept}>Применить</button>
                </div>) : null
            }
        </div>
    )
}

export default Type;