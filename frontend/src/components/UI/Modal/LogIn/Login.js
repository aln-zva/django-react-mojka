import React, {Fragment, useState} from 'react'

import classes from './Login.module.css'
import loginImg from '../../../../assets/logInImg.png'
import SingIn from "../SignIn/SignIn";
import { useSelector, useDispatch } from "react-redux";
import {logInFieldActions} from '../../../../store/log-in-field-slice'
import {toggleLogInActions} from "../../../../store/log-in-toggle";
import {authActions} from "../../../../store/auth-slice";

const Login = (props) => {
    const dispatch = useDispatch();
    const [signIn, setSignIn] = useState(false);
    const signInHandler = () => {
        setSignIn(true);
        dispatch(logInFieldActions.toHideLogInField());
    }
    console.log(signIn)

    const showLogInField = useSelector(state => state.loginField.showLoginField)

    const loggedUserHandler = () => { // кнопка войти на поле войти
        dispatch (toggleLogInActions.toggle())
        dispatch(logInFieldActions.toHideLogInField());
        dispatch(authActions.toLogIn())
    }

    return (
        <Fragment>
            {showLogInField ? (<div className={classes.login}>
                <div className={classes.image}><img src={loginImg} alt=""/></div>
                <div className={classes.form}>
                    <div className={classes.formText}>Войдите в аккаунт и отслеживайте крутые события!</div>
                    <input type="text" placeholder="Логин"/>
                    <input type="text" placeholder="Пароль"/>
                    <input type="submit" value="Войти" onClick={loggedUserHandler}/>
                    <button className={classes.singInButton} onClick={signInHandler}>Регистрация</button>
                </div>
            </div>) : signIn ? (<SingIn/>) : null}
        </Fragment>
    )
}

export default Login;