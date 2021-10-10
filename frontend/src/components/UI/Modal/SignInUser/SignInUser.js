import React, {Fragment, useState} from 'react'

import classes from './SignInUser.module.css'
import CodeSendForm from "../CodeSendForm/CodeSendForm";
import {useDispatch} from "react-redux";
import {logInFieldActions} from "../../../../store/log-in-field-slice";

const SignInUser = () => {
    const [toSignInUser, setToSignInUser] = useState(false);
    const toSignInUserHandler = () => {
        setToSignInUser(!toSignInUser);
    }
    const dispatch = useDispatch();
    const toggleLogInField = () => {
        dispatch(logInFieldActions.toShowLogInField()) //выключаем окна регистрации (signin)
    }

    return (
        <Fragment>
            {!toSignInUser ? (<div className={classes.signInUser}>
                <div className={classes.accountCreationUser}>
                    <div className={classes.createAccountTextUser}>Создайте аккаунт в Мойке</div>
                    <input type="text" placeholder="Имя"/>
                    <input type="text" placeholder="Фамилия"/>
                    <input type="text" placeholder="Почта"/>
                    <button className={classes.signInButton} onClick={toSignInUserHandler}>Зарегистрироваться</button>
                    <button className={classes.logInButton} onClick={toggleLogInField}>Войти</button>
                </div>
            </div>) : <CodeSendForm getBack={toSignInUserHandler}/>}
        </Fragment>
    )
}

export default SignInUser;
