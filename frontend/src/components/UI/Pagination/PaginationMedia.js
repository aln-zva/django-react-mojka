import React, {useState} from 'react'

import classes from './Pagination.module.css'
import leftImg from '../../../assets/left.png'
import rightImg from '../../../assets/rightActive.png'
import {useSelector, useDispatch} from "react-redux";
import {eventsActions} from "../../../store/events-slice";
import axios from "axios";
import {mediaActions} from "../../../store/media-slice";

const Pagination = props => {
    const dispatch = useDispatch()
    const eventState = useSelector(state => state.event.eventData)
    const media = useSelector(state => state.media.mediaData)

    console.log(media)
    let mediaCount
    let page_size
    let next
    let previous
    if (media) {
        if (media.payload['count']){
            console.log(1)
            mediaCount = media.payload['count']
            page_size = media.payload['page_size']
            next = media.payload['next']
            previous = media.payload['previous']
        } else {
            console.log(1)
        }
    }
    let pagesCount = Math.ceil(mediaCount/page_size)
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
        const mediaOnPage = resp.data;
        dispatch(mediaActions.setMedia(mediaOnPage));
        })
    }
    const [lastPage, setLastPage] = useState(false)
    const [firstPage, setFirstPage] = useState(true)

    const nextPage = () => {
        if (next !== null){
            axios.get(next).then((resp) => {
                const mediaOnPage = resp.data;
                dispatch(mediaActions.setMedia(mediaOnPage));
            })
            setLastPage(false)
            setFirstPage(false)
        } else {setLastPage(true)}
    }

    const previousPage = () => {
        if (previous !== null){
            axios.get(previous).then((resp) => {
                const mediaOnPage = resp.data;
                dispatch(mediaActions.setMedia(mediaOnPage));
            })
            setFirstPage(false)
            setLastPage(false)
        } else {setFirstPage(true)}
    }
    console.log(media)
    return (
        <div className={classes.pagination}>
            <button onClick={previousPage} disabled={firstPage} className={classes.leftArrowBlock}><div className={classes.leftArrow}/></button>
            <div className={classes.numbers}>
                {pages.map(page =>
                    <div
                        key={page}
                        className={currentPage === page ? classes.selectedNumber : classes.number}
                        onClick={()=>currentPageHandler(page)}>
                        <span>{page}</span>
                    </div>)
                }
            </div>
            <button onClick={nextPage} disabled={lastPage} className={classes.rightArrowBlock}><div className={classes.rightArrow}/></button>
        </div>
    )
}

export default Pagination;