import React, {Fragment, useState} from 'react'

import classes from './SignInStudent.module.css'
import CodeSendForm from "../CodeSendForm/CodeSendForm";
import { useDispatch} from "react-redux";
import {logInFieldActions} from "../../../../store/log-in-field-slice";

const SignInStudent = (props) => {
    const [toSignInStudent, setToSignInStudent] = useState(false);
    const toSignInStudentHandler = () => {
        setToSignInStudent(!toSignInStudent);
    }
    const dispatch = useDispatch();
    const toggleLogInField = () => {
        dispatch(logInFieldActions.toShowLogInField())
    }

    return (
        <Fragment>
            {!toSignInStudent ? (<div className={classes.signInStudent}>
                <div className={classes.accountCreation}>
                    <div className={classes.createAccountText}>Создайте аккаунт в Мойке</div>
                    <input type="text" placeholder="Почта" autoComplete="on"/>
                    {/*<input type="password" placeholder="Пароль WiFi*"/>*/}
                    <button className={classes.signInButton} onClick={toSignInStudentHandler}>Зарегистрироваться</button>
                    <button className={classes.logInButton} onClick={toggleLogInField}>Войти</button>
                    <div className={classes.wifiInfo}>*Пароль от WIFI в личном кабинете СПбГУТ</div>
                </div>
            </div>) : <CodeSendForm getBack={toSignInStudentHandler}/>}
        </Fragment>
    )
}

export default SignInStudent;