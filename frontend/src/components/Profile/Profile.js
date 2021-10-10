import React from 'react'

import classes from './Profile.module.css'
import UserInfo from "./UserInfo/UserInfo";
import ProfileNotifications from "./ProfileNotifications/ProfileNotifications";
import ProfileEvents from "./ProfileEvents/ProfileEvents";
import ProfileFeedback from "./ProfileFeedback/ProfileFeedback";

const Profile = props => {
    return (
        <div className={classes.profile}>
            <div className={classes.userInfo}>
                <UserInfo name="Михаил Бонч-Бруевич"/>
                <div className={classes.profileBlock}>
                    <ProfileNotifications/>
                    <ProfileEvents/>
                    <ProfileFeedback/>
                </div>
            </div>
        </div>
    )
}

export default Profile;