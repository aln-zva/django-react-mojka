import React, {useState} from 'react'
import imageUrl from "../../assets/main_news.png"
import classes from './MainNews.module.css'
import NewsLetter from "./NewsLetter/NewsLetter";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {pagesAction} from "../../store/pages-state-slice";
import axios from "axios";
import {eventsActions} from "../../store/events-slice";

const MainNews = props => {
    const dispatch = useDispatch()

    const newsState = useSelector(state => state.news.newsData)
    const eventsAll = useSelector(state => state.event.allEvents)

    let news = []
    console.log(newsState)
    if (newsState !== null) {
        news = [...newsState.payload.results]
    }
    console.log(news)

    const [all, setAll] = useState({events:null})

    const openEventPage = () => {
        dispatch(pagesAction.toggleEvent())
        const eventsUrl = 'http://localhost:8000/events_all'
        axios.get(eventsUrl).then((resp) => {
            const allEvents = resp.data;
            console.log(allEvents)
            dispatch(eventsActions.setAll(allEvents.results));
        })
    }

    const lettersState = {
        1: true,
        2: false,
        3: false,
        4: false
    }
    const [letters, setLetters] = useState(lettersState);
    const [link, setLink] = useState(0)
    const [background, setBackground] = useState(imageUrl);
    const [title,setTitle] = useState('Онлайн Мойка')

    let styleMainButton = {
        cursor: 'default',
        display: 'none'
    }

    const selectLetterHandler = (id, event_id) => {
        let news_letter = news.find(item => item.id === id)
        console.log(news_letter)
        setLink(Number(event_id))
        setBackground(String(news_letter.photo))
        setTitle(news_letter.name)
        for (let key in lettersState)
            if (Number(key) === Number(id)) {
                letters[key] = true
            } else {letters[key] = false}
    }

    return (
        <div style={{backgroundImage: `url(${background})`}} className={classes.mainNews} id={props.id}>
        <div className={classes.block}>
                <h1>{title}</h1>
            {/*<img src="/images/back2.png" alt=""/>*/}
            {link !==0 ?
                (<Link
                        to={`/event/${link}`}
                        className={classes.mainNewsButton}
                        onClick={openEventPage}>Подробнее о меро</Link>) :
                <button className={classes.mainNewsButton} disabled={true} style={styleMainButton}>Подробнее о меро</button>}
            <div className={classes.letters}>
                        {news.map((item, index) => (
                            <NewsLetter
                                key={index}
                                subject={item.description}
                                clicked={()=>selectLetterHandler(item.id, item.event_id)}
                                state={letters[String(item.id)]}
                            />
                        ))}
                    </div>
            </div>
        </div>
    )
}

export default MainNews;