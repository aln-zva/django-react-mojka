import React, {useState} from "react";

import classes from './OpenPhoto.module.css'
import close from '../../../../assets/closePhoto.png'
import download from '../../../../assets/downloadPhoto.png'

const OpenPhoto = (props) => {
    const [photoPath, setPhotoPath] = useState(props.photo)
    const nextPhoto = () => {
        props.clickNext()
        setPhotoPath(props.next)
    }
    return (
        <div className={classes.openPhoto}>
            <div className={classes.modal}>
                <div className={classes.mainBlock}>
                    <div className={classes.leftArrowBlock}><div className={classes.leftArrow}/></div>
                    <img src={photoPath} alt="" className={classes.photo}/>
                    <div className={classes.info}>
                        <div className={classes.count}>{props.number} из {props.amount}</div>
                        <div className={classes.download}>
                            <img src={download} alt=""/>
                            <a href={props.current} download={true}>Скачать</a>
                        </div>
                    </div>
                    <div className={classes.rightArrowBlock} onClick={nextPhoto}><div className={classes.rightArrow}/></div>
                </div>
                <img src={close} alt="" className={classes.close} onClick={props.close}/>
            </div>
        </div>
    )
}

export default OpenPhoto;