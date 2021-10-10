import React, {useEffect, useState} from 'react'
import {Link, useParams, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import classes from './EventPosterBlock.module.css'
import empty from '../../../assets/EventPosterBlock.png'
import eleven from '../../../assets/eleven.png'
import eventImg2 from '../../../assets/back2.png'
import arrowLeft from '../../../assets/rightActive.png'
import arrowRight from '../../../assets/leftActive.png'
import gallery from '../../../assets/gallery.png'
import PhotoAlbum from "../PhotoAlbum/PhotoAlbum";
import ScrollToTop from "../../UI/ScrollToTop/ScrollToTop";
import {pagesAction} from "../../../store/pages-state-slice";
import axios from "axios";
import {mediaActions} from "../../../store/media-slice";

const EventPosterBlock = props => {
    const dispatch = useDispatch()
    const params = useParams()
    const [mediaState, setMediaState] = useState({media:null})

    useEffect(()=>{
        const mediaUrl = `http://localhost:8000/media/?event_id=${params.eventId}`
        axios.get(mediaUrl).then((resp) => {
            const allMedia = resp.data;
            setMediaState({
                media: allMedia
            })
            dispatch(mediaActions.setMedia(allMedia));
        });
    }, [setMediaState])


    const openAlbumPage = () => {
        dispatch(pagesAction.toggleAlbum())
    }
    const media = useSelector(state => state.media.mediaData)
    let photos = []
    if (media) {
        if (media.payload['count'] || media.payload['count'] === 0){
            console.log(1)
            photos = [...media.payload.results]
        } else {
            console.log(1)
            photos = [...media.payload]
        }
    }
    console.log(props.main_photo)

    const allEvents = useSelector(state => state.event.allEvents)
    console.log(params.eventId)
    let events = []
    let thisEvent = []

    if (allEvents) {
        if (allEvents.payload['count']){
            console.log(1)
            events = [...allEvents.payload.results]
            thisEvent = events.find((item) => item.id === Number(params.eventId)
        )
        } else {
            console.log(1)
            events = [...allEvents.payload]
            thisEvent = events.find((item) => item.id === Number(params.eventId)
        )
        }
    }
    console.log(thisEvent.main_photo)
    let img = thisEvent.main_photo
    console.log(img)
    const [selectedPhoto, setSelectedPhoto] = useState(img)
    const [selectedPhotoId, setSelectedPhotoId] = useState(0)
    console.log(selectedPhoto)

    const selectPhotoHandler = (id) => {
        let select = photos.find(photo => photo.id === id)
        setSelectedPhoto(select.path)
        setSelectedPhotoId(select.id)
    }
    return (
        <div className={classes.eventPoster}>
            <div className={classes.mainPhoto}>
                {/*<img src={empty} alt="" className={classes.eventPosterImg}/>*/}
                <img src={selectedPhoto} alt="" className={classes.eventPhotoMain}/>
            </div>
            <div className={classes.gallery}>
                {photos.length > 0 && photos.map(photo =>
                    <img src={photo.path} alt=""
                         className={selectedPhotoId === photo.id ? classes.chosenImg : classes.galleryImg}
                         onClick={() => selectPhotoHandler(photo.id)}/>
                )}
            </div>
            <div className={classes.managePhotos}>
                <div className={classes.arrows}>
                    <img src={arrowLeft} alt=""/>
                    <img src={arrowRight} alt=""/>
                </div>
                <Link to={`/event/${params.eventId}/media`} className={classes.openAlbum} onClick={openAlbumPage}>
                    <img src={gallery} alt=""/>
                    <div>Посмотреть фотоальбом</div>
                </Link>
            </div>
        </div>
    )
}

export default EventPosterBlock;