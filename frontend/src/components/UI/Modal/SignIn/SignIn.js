import React, {Fragment, useState} from 'react'

import classes from './SignIn.module.css'
import SignInStudent from "../SignInStudent/SignInStudent";
import SignInUser from "../SignInUser/SignInUser";

const SingIn = (props) => {
    const [isStudentState, setIsStudentState] = useState(false);
    const [isExternalUserState, setIsExternalUserState] = useState(false);

    const isStudentHandler = () => {
        setIsStudentState(true);
    }
    const isExternalUserHandler = () => {
        setIsExternalUserState(true);
    }

    return (
        <Fragment>
            {isStudentState ? (<SignInStudent/>) : isExternalUserState ? (<SignInUser/>) : (
                <div className={classes.singIn}>
                    <div className={classes.question}>Вы студент(ка) Бонча?</div>
                    <div className={classes.answers}>
                        <button className={classes.yesAnswer} onClick={isStudentHandler}>Да</button>
                        <button className={classes.noAnswer} onClick={isExternalUserHandler}>Нет</button>
                    </div>
                </div>)
            }
        </Fragment>

    )
}

export default SingIn;