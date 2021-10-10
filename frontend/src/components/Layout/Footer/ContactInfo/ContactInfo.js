import React from "react";

import classes from './ContactInfo.module.css'
import message from "../../../../assets/footerMessage.png";

const ContactInfo = (props) => {
    const openLink = (link) => {
        window.open(link);
    }
    let my_link = ""
    my_link = props.link
    return (
        <div
            className={classes.contactInfo}
            onClick={() => openLink(my_link)}>
            <img src={props.image} alt=""/>
            <div>{props.children}</div>
        </div>
    )
}

export default ContactInfo;