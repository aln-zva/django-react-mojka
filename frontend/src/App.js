import React, { Fragment, useState, useEffect} from 'react';
import './App.css';
import MainNews from "./components/MainNews/MainNews";
import Poster from "./components/Poster/Poster";
import Event from "./components/Event/Event";
import Profile from "./components/Profile/Profile";
import {Route, Switch, Redirect} from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/UI/ScrollToTop/ScrollToTop";
import axios from 'axios'
import {eventsActions} from "./store/events-slice";
import {newsActions} from "./store/news-slice";
import {useDispatch, useSelector} from "react-redux";
import PhotoAlbum from "./components/Event/PhotoAlbum/PhotoAlbum";

const App = () => {
    const [eventsArrState, setEventsArrState] = useState({events: null})
    const [newsArrState, setNewsArrState] = useState({news: null})


    const dispatch = useDispatch()
    const newsState = useSelector(state => state.news.newsData)

    useEffect(()=>{
        const eventsUrl = 'http://localhost:8000/events'
        axios.get(eventsUrl).then((resp) => {
        const allEvents = resp.data;
        setEventsArrState({
            events: allEvents,
        });
        dispatch(eventsActions.setEvents(allEvents));
        });
    }, [setEventsArrState])
    console.log(eventsArrState)

    useEffect(()=>{
        const newsUrl = 'http://localhost:8000/news'
        axios.get(newsUrl).then((resp) => {
        const allNews = resp.data;
        setNewsArrState({
            news: allNews,
        });
        dispatch(newsActions.setNews(allNews));
        });
    }, [setNewsArrState])

    console.log(newsState)


    return (
      <Fragment>
          <Layout>
              <ScrollToTop>
                  <Route path='/'>
                      <Redirect to='/main-page'/>
                  </Route>
                  <Route path='/main-page'>
                      <MainNews id="news"/>
                      <Poster id="poster"/>
                  </Route>
                  <Switch>
                      <Route exact path='/event/:eventId'>
                      <Event/>
                      </Route>
                      <Route exact path='/event/:eventId/media' >
                          <PhotoAlbum/>
                      </Route>
                  </Switch>
                  <Route path='/profile'>
                      <Profile/>
                  </Route>
              </ScrollToTop>
          </Layout>
      </Fragment>
    );
}

export default App;