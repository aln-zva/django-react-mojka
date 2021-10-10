import React, {useState} from 'react'

import classes from './UserInfoAvatar.module.css'
import add from '../../../../assets/addAvatar.png'
import avatar from '../../../../assets/avatar.png'


const UserInfoAvatar = props => {
    const [result, setResult] = useState("");
    const [imageIsLoaded, setImageIsLoaded] = useState(false)
    const uploader = (e) => {
        const imageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setResult(e.target.result);
        });

        if(e.target.files[0]){
            setImageIsLoaded(true)
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    return (
        <div className={classes.avatar}>
            <div className={classes.circle} style={{backgroundImage: `url(${avatar})`}}>
                { props.isEditable ? (<label className={classes.label}>
                    <img src={add} alt="" className={classes.add}/>
                    <input
                        type="file" id="my_avatar" onChange={(e) => {
                        uploader(e);
                    }}
                    />
                    {
                        imageIsLoaded ? (<div className={classes.blockPreview}>
                                <div className={classes.innerPreview}><img src={result} alt="" className={classes.addedAvatarPreview}/>
                                </div>
                            </div>)
                            : null
                    }
                </label>) : props.isSaved ? (<div className={classes.blockAdded}>
                    <div className={classes.innerAdded}><img src={result} alt="" className={classes.addedAvatar}/>
                    </div>
                </div>) : null }


            {/*<Avatar*/}
            {/*    onCrop={onCrop}*/}
            {/*    onClose={onClose}*/}
            {/*    onBeforeFileLoad={onBeforeFileLoad}*/}
            {/*    src={null}*/}
            {/*/>*/}
            {/*    <img src={avatarImg} alt="" className={classes.circle}/>*/}
            </div>
        </div>
    )
}

export default UserInfoAvatar;