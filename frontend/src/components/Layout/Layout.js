import React, {Fragment} from 'react'
import classes from './Layout.module.css'
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classNames from "classnames/bind";
import {useSelector} from "react-redux";

let cx = classNames.bind(classes);

const Layout = (props) => {

    const profile = useSelector(state => state.pages.profilePage)
    const main = useSelector(state => state.pages.mainPage)
    const event = useSelector(state => state.pages.eventPage)
    const album = useSelector(state => state.pages.albumPage)


    let className = cx({
        layoutProfile: profile,
        layoutMain: !profile && main,
        layoutEvent: event,
        layoutAlbum: album
    });

    return (
        <Fragment>
            <Header/>
            <main className={className}>{props.children}</main>
            <Footer id="contacts"/>
        </Fragment>
    )
}

export default Layout;