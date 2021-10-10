import React, {Fragment, useState} from 'react'

import classes from './CodeSendForm.module.css'
import PasswordForm from "../PasswordForm/PasswordForm";

const CodeSendForm = (props) => {
    const [codeIsSent, setCodeIsSent] = useState(false);
    const codeIsSentHandler =() => {
        setCodeIsSent(!codeIsSent);
    }
    return (
        <Fragment>
            {!codeIsSent ? (<div className={classes.codeSent}>
                <div className={classes.codeSentField}>
                    <div className={classes.codeSentInfo}>Введите отправленный Вам код!</div>
                    <input type="text" placeholder="Код"/>
                    <input type="submit" value="Отправить" onClick={codeIsSentHandler}/>
                    <button className={classes.codeSentBack} onClick={(e)=>props.getBack(e)}>Назад</button>
                </div>
            </div>) : <PasswordForm getBackToCode={codeIsSentHandler}/>}
        </Fragment>
    )
}

export default CodeSendForm;