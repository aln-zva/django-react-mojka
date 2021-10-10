import React, {useState} from 'react'

import classes from './Pagination.module.css'
import leftImg from '../../../assets/left.png'
import rightImg from '../../../assets/rightActive.png'
import {useSelector, useDispatch} from "react-redux";
import {eventsActions} from "../../../store/events-slice";
import axios from "axios";

const Pagination = props => {
    const dispatch = useDispatch()
    const eventState = useSelector(state => state.event.eventData)
    console.log(eventState)
    let eventsCount
    let page_size
    let next = ''
    let previous = ''
    if (eventState) {
        if (eventState.payload['count']){
            console.log(1)
            eventsCount = eventState.payload['count']
            page_size = eventState.payload['page_size']
            next = eventState.payload['next']
            previous = eventState.payload['previous']
        } else {
            console.log(1)
        }
    }
    let pagesCount = Math.ceil(eventsCount/page_size)
    let pages = []
    for (let i = 0; i < pagesCount; i++)
    {
        pages.push(i+1)
    }

    const currentPage = useSelector(state => state.event.currentPage)

    console.log(currentPage)
    const currentPageHandler = (id) => {
        dispatch(eventsActions.setCurrentPage(id))
        const eventsUrl = `http://localhost:8000/events?page=${id}`
        axios.get(eventsUrl).then((resp) => {
        const eventsOnPage = resp.data;
        dispatch(eventsActions.setEvents(eventsOnPage));
        dispatch(eventsActions.setActiveEvents(eventsOnPage));
        })
    }
    const [lastPage, setLastPage] = useState(false)
    const [firstPage, setFirstPage] = useState(true)

    const nextPage = () => {
        if (next !== null){
            axios.get(next).then((resp) => {
                const eventsOnPage = resp.data;
                dispatch(eventsActions.setEvents(eventsOnPage));
                dispatch(eventsActions.setActiveEvents(eventsOnPage));
            })
            setLastPage(false)
            setFirstPage(false)
        } else {setLastPage(true)}
    }

    const previousPage = () => {
        if (previous !== null){
            axios.get(previous).then((resp) => {
                const eventsOnPage = resp.data;
                dispatch(eventsActions.setEvents(eventsOnPage));
                dispatch(eventsActions.setActiveEvents(eventsOnPage));

            })
            setFirstPage(false)
            setLastPage(false)
        } else {setFirstPage(true)}
    }

    return (
        <div className={classes.pagination}>
            <button onClick={previousPage} disabled={firstPage} className={classes.leftArrowBlock}><div className={classes.leftArrow}/></button>
            <div className={classes.numbers}>
                {pages.map(page =>
                    <div
                        key={page}
                        className={currentPage === page ? classes.selectedNumber : classes.number}
                        onClick={()=>currentPageHandler(page)}
                    >
                        <span>{page}</span>
                    </div>)
                }
            </div>
            <button onClick={nextPage} disabled={lastPage} className={classes.rightArrowBlock}><div className={classes.rightArrow}/></button>
        </div>
    )
}

export default Pagination;