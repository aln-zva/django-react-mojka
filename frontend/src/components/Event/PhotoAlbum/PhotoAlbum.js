import React, {useEffect, useState, Fragment} from "react";

import classes from './PhotoAlbum.module.css'
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {pagesAction} from "../../../store/pages-state-slice";
import {mediaActions} from "../../../store/media-slice";
import axios from "axios";
import OpenPhoto from "../../UI/Modal/OpenPhoto/OpenPhoto";
import PaginationMedia from "../../UI/Pagination/PaginationMedia";

const PhotoAlbum = (props) => {

    const dispatch = useDispatch()
    const params = useParams()

    const openMainPage = () => {
        dispatch(pagesAction.toggleMain())
    }
    const [mediaState, setMediaState] = useState(
    {
        loading: false,
        media: null,
    }
  )
    const [selectedPhoto, setSelectedPhoto] = useState("")
    const [openPhoto, setOpenPhoto] = useState(false);
    const [photoOrder, setPhotoOrder] = useState(1)

    const toggleOpenPhoto = (path, id) => {
        setOpenPhoto(!openPhoto)
        setSelectedPhoto(path)
        setPhotoOrder(id)
    }

    const nextPhoto = () => {
        setPhotoOrder(photoOrder+1)
        if (photoOrder > photos.length-1) {
            setPhotoOrder(1)
        }
    }

    useEffect(()=>{
        const mediaUrl = `http://localhost:8000/media/?event_id=${params.eventId}`
        axios.get(mediaUrl).then((resp) => {
        const allMedia = resp.data;
        dispatch(mediaActions.setMedia(allMedia));
        });
    }, [])


    const media = useSelector(state => state.media.mediaData)
    const eventsState = useSelector(state => state.event.eventData)
    console.log(media)
    let events = []
    let photos = []
    let thisEvent = {}

    if (eventsState) {
        if (eventsState.payload['count']){
            events = [...eventsState.payload.results]
            thisEvent = events.find((item) => item.id === Number(params.eventId))
        } else {
            events = [...eventsState.payload]
            thisEvent = events.find((item) => item.id === Number(params.eventId))
        }
    }
    if (media) {
        photos = [...media.payload.results];
    }

    console.log(photos)

    return (
        <Fragment>
            <div className={classes.photoAlbum}>
            <div className={classes.navigation}>
                <Link to='/main-page' className={classes.page} onClick={openMainPage}>Главная</Link>
                <div className={classes.line}/>
                <Link to={`/event/${params.eventId}`} className={classes.page}>Мероприятие</Link>
                <div className={classes.line}/>
                <a href="" className={classes.onPage}>Фотоальбом</a>
            </div>
            <div className={classes.name}>{thisEvent.name}</div>
            <div className={classes.photos}>
                {photos.map((photo, index) =>
                            <img
                            src={String(photo.path)} alt=""
                            onClick={() => toggleOpenPhoto(String(photo.path), index+1)}/>)
                }
            </div>
            <div className={classes.pagination}><PaginationMedia/></div>
        </div>
            {openPhoto ? <OpenPhoto
                photo={selectedPhoto}
                close={toggleOpenPhoto}
                number={photoOrder}
                amount={photos.length}
                current={(photoOrder && photoOrder < photos.length-1) ? photos[photoOrder-1].path : photos[0].path}
                next={(photoOrder && photoOrder < photos.length) ? photos[photoOrder].path : photos[0].path}
                clickNext={nextPhoto}
            /> : null}
        </Fragment>
    )
}

export default PhotoAlbum;