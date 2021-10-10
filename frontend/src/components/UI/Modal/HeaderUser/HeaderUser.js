import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../store/auth-slice";

import classes from './HeaderUser.module.css'
import profile from '../../../../assets/HeaderProfile.png'
import logOut from '../../../../assets/HeaderLogOut.png'
import {Link} from "react-router-dom";
import {pagesAction} from "../../../../store/pages-state-slice";

const HeaderUser = () => {
    const dispatch = useDispatch();
    const toLogOut = () => {
        dispatch(authActions.toLogOut())
    }

    const openProfile = () => {
        dispatch(pagesAction.toggleProfile())
    }
    // const profile = useSelector(state => state.pages.profilePage)
    // console.log(profile)

    return (
        <div className={classes.headerUser}>
            <Link to='/profile' className={classes.block} onClick={openProfile}>
                <img src={profile} alt="" className={classes.profileImg}/>
                <div>Личный кабинет</div>
            </Link>
            <div className={classes.block} onClick={toLogOut}>
                <img src={logOut} alt="" className={classes.logOutImg}/>
                <div>Выйти из аккаунта</div>
            </div>
        </div>
    )
}

export default HeaderUser;