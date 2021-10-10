import React, {useState} from 'react'
import {Link as LinkR} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import {logInFieldActions} from '../../../store/log-in-field-slice'
import {toggleLogInActions} from "../../../store/log-in-toggle";
import {pagesAction} from "../../../store/pages-state-slice";
import notifications from '../../../assets/headerNotif.png'
import HeaderNotifications from "../../UI/Modal/HeaderNotifications/HeaderNotifications";
import HeaderUser from "../../UI/Modal/HeaderUser/HeaderUser";
import {Link as LinkS} from 'react-scroll'
import {HashLink, NavHashLink} from "react-router-hash-link";

import classes from './Header.module.css'
import Login from '../../UI/Modal/LogIn/Login'

const Header = props => {

    const dispatch = useDispatch();
    const logInFieldisShowed = useSelector(state => state.toggle.toShow)
    const isLogged = useSelector(state => state.auth.authenticated)
    const [showNotifications, setShowNotifications] = useState(false);
    const [userOptions, setUserOptions] = useState(false);

    const toggleUserOptions = () => { //сделать глобальным, чтобы по нажатии на Личный кабинет в HeaderUser окно закрывалось
        setUserOptions(!userOptions);
        setShowNotifications(false);
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        setUserOptions(false);
    }

    const loginHandler = () => { // кнопка войти на шапке
        if (!isLogged)
        {
            dispatch (toggleLogInActions.toggle())
            dispatch(logInFieldActions.toShowLogInField());
        }
    }

    const openMainPage = () => {
        dispatch(pagesAction.toggleMain())
        window.scrollTo(0,0)
    }

    return (
        <div className={classes.header}>
            {!isLogged ? (<div className={classes.details}>
               <LinkR to='/main-page' className={classes.headerH1} onClick={openMainPage}>Online Moika</LinkR>
               <ul className={classes.ulLoggedOut}>
                   <li>
                       <NavHashLink
                           className={classes.poster}
                           activeClass={classes.active}
                           to='/main-page#poster'
                           smooth={true}
                           onClick={openMainPage}
                       >
                           Афиша
                       </NavHashLink>
                   </li>
                   <li>
                           <LinkS
                               className={classes.contacts}
                               activeClass={classes.active}
                               to="contacts" spy={true} hash="#contacts"
                               smooth={true} offset={-480} duration={1200}>
                               Контакты
                           </LinkS>
                   </li>
               </ul>
                    <button onClick={loginHandler} className={classes.headerButton}>Войти</button>
                </div>) : (
                <div className={classes.details}>
                    <LinkR to='/main-page' className={classes.headerH1} onClick={openMainPage}>Online Moika</LinkR>
                    <ul className={classes.ulLoggedIn}>
                       <li>
                           <NavHashLink
                               className={classes.poster}
                               activeClass={classes.active}
                               to='/main-page#poster'
                               smooth={true}
                               onClick={openMainPage}
                           >
                               Афиша
                           </NavHashLink>
                       </li>
                       <li><LinkS
                           className={classes.contacts}
                           activeClass={classes.active}
                           to="contacts" spy={true} hash="#contacts"
                           smooth={true} offset={-480} duration={1200}
                       >
                           Контакты
                       </LinkS>
                       </li>
                       <li>
                           <div className={classes.notificationsBell}>
                               <img src={notifications} alt="" onClick={toggleNotifications}/>
                               <div className={classes.notificationsActive}/>
                           </div>
                       </li>
                   </ul>
                    <button onClick={toggleUserOptions} className={classes.loggedInUserButton}>
                        <div className={classes.arrow}/>
                        <div className={classes.userName}>Михаил</div>
                        <div className={classes.userAvatar}/>
                    </button>
                </div>
               )}
               {/*{showLogInField ? (<Login logInClicked={loggedUserHandler}/>) : null}*/}
            {logInFieldisShowed && (<Login/>)}
            {showNotifications && (<HeaderNotifications/>)}
            {(isLogged && userOptions) ? (<HeaderUser/>) : null}
        </div>
    )
};

export default Header;