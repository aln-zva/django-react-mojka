import React from 'react'

import classes from './Footer.module.css'
import search from '../../../assets/search_footer.png'
import logo from '../../../assets/logo.png'
import phone from '../../../assets/Vector.png'
import message from '../../../assets/footerMessage.png'
import ingut from '../../../assets/miniIngut.png'
import chick from '../../../assets/footerChick.png'
import ContactInfo from "./ContactInfo/ContactInfo";
import {pagesAction} from "../../../store/pages-state-slice";
import {useDispatch} from "react-redux";
import {Link, Link as LinkR} from "react-router-dom";
import {NavHashLink} from "react-router-hash-link";
import profile from "../../../assets/HeaderProfile.png";

const Footer = props => {
    const dispatch = useDispatch();
    const openMainPage = () => {
        dispatch(pagesAction.toggleMain())
        window.scrollTo(0,0)
    }

    const openProfile = () => {
        dispatch(pagesAction.toggleProfile())
    }

    return (
        <div className={classes.footer} id={props.id}>
            <div className={classes.block}>
                <img src={logo} alt="" className={classes.logo}/>
                <div className={classes.contacts}>
                    <div className={classes.header}>Контакты</div>
                    <div className={classes.contactsInfoBlock} style={{cursor: 'default'}}>
                        <img src={phone} alt=""/>
                        <div>+7 (931) 966-29-06</div>
                    </div>
                    <ContactInfo
                        image={message}
                        link='https://vk.com/im?media=&sel=-53483685'>Ссылка на поныть</ContactInfo>
                    <ContactInfo
                        image={ingut}
                        link='https://vk.com/ingut'>INGUT</ContactInfo>
                    <ContactInfo
                        image={chick}
                        link='https://vk.com/an.tsepilevich'>Анастасия Цепилевич</ContactInfo>
                </div>
                <div className={classes.navigation}>
                    <div className={classes.header}>Навигация</div>
                    <div className={classes.navigationBlock}>
                        <LinkR
                            to='/main-page'
                            onClick={openMainPage}
                            className={classes.link}>Главная</LinkR>
                    </div>
                    <div className={classes.navigationBlock}>
                        <NavHashLink
                           className={classes.link}
                           to='/main-page#poster'
                           smooth={true}
                           onClick={openMainPage}>
                           Афиша
                       </NavHashLink>
                    </div>
                    <div className={classes.navigationBlock}>
                        <LinkR
                            to='/profile'
                            className={classes.link}
                            onClick={openProfile}>Личный кабинет</LinkR>
                    </div>
                </div>
                <img src={search} alt="" className={classes.search}/>
            </div>
        </div>
    )
}

export default Footer;

