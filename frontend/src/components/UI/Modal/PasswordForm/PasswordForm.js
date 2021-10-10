import React, {Fragment, useState} from 'react'

import classes from './PasswordForm.module.css'

const PasswordForm = (props) => {
    return (
        <Fragment>
            <div className={classes.passwordForm}>
                <div className={classes.passwordFormField}>
                    <div className={classes.passwordFormInfo}>Создайте свой пароль!</div>
                    <input type="password" placeholder="Пароль" />
                    <input type="password" placeholder="Повторите пароль" />
                    <input type="submit" value="Отправить"/>
                    <button className={classes.passwordSentBack} onClick={()=>props.getBackToCode()}>Назад</button>
                </div>
            </div>
        </Fragment>
    )
}

export default PasswordForm;