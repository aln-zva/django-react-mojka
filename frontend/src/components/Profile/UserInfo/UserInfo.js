import React, {useState} from 'react'

import classes from './UserInfo.module.css'
import UserInfoAvatar from "./UserInfoAvatar/UserInfoAvatar";
import edit from '../../../assets/editProfile.png'
import group from '../../../assets/groupProfile.png'
import facultyImg from '../../../assets/facultyProfile.png'
import email from '../../../assets/emailProfile.png'
import UserInfoPersonal from "./UserInfoPersonal/UserInfoPersonal";
import Calendar from "./UserInfoCalendar/UserInfoCalendar";
import Select from "react-select";
import close from '../../../assets/closeEditButton.png'
import accept from '../../../assets/acceptEditButton.png'

const UserInfo = props => {
    const options = [
        {label: "ИКСС", value: "IKSS", state: true, className:'select'},
        {label: "РТС", value: "RTS", state: false, className:'select'},
        {label: "ИСиТ", value: "IST", state: false, className:'select'},
        {label:"СЦТ", value: "SCT", state: false, className:'select'},
        {label: "ФФП", value: "FFP", state: false, className:'select'},
        {label: "ЦЭУБИ", value: "Economy", state: false, className:'select'},
        {label: "ВУЦ", value: "IVO", state: false, className:'select'},
        {label: "Колледж", value: "College", state: false, className:'select'}
]
    const [facultyState, setFaculty] = useState(options);
    const [editButton, setEditButton] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const saveButtonHandler = () => {
        setIsSaved (true);
        setEditButton(false);
    }

    const cancelButtonHandler = () => {
        setIsSaved(false);
        setEditButton(false);
    }

    const editButtonHandler = () => {
        setEditButton(!editButton);
        setIsSaved(false);
    }

    const styles = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isSelected ? "bold" : "normal",
            color: '#121212',
            backgroundColor: state.isFocused ? '#F0EFFF' : '#FCFCFC',
            border: 'none',
            onClick: () => facultyStateHandler()
            // fontSize: state.selectProps.myFontSize
        }),
        control: (provided, state) => ({
            ...provided,
            width: 343,
            height: 38,
            borderRadius: 0,
            borderStyle: 'none',
            backgroundColor: state.isDisabled ? '#FCFCFC': '#FCFCFC',
            color: state.isDisabled ? '#121212' : '#121212'
        }),
        container: (provided, state) => ({
            ...provided,
            marginLeft: 0,
            width: 343,
            backgroundColor: state.isDisabled ? '#FCFCFC': '#FCFCFC'
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: 38
        }),
        singleValue: (provided, state) => ({
            ...provided,
            top: 26,
            height: 38,
            color: state.isDisabled ? '#121212' : '#121212'

        }),
        placeholder: (provided) => ({
            ...provided,
            top: 25,
            height: 38,
        }),
    }

    const facultyStateHandler = (value) => {
        setFaculty(
            facultyState.map((item) =>
                (item.value === value && item.state !== true) ? {...item, state: true} : {...item, state: false}
            )
        )
    }
    console.log(facultyState)



    return (
        <div className={classes.userInfo}>
            <UserInfoAvatar
                isEditable={editButton}
                isSaved={isSaved}
            />
            <input type="text" className={classes.name} placeholder={props.name} disabled={!editButton}/>
            {
                !editButton ? (
                    <button className={classes.editButton}>
                        <img src={edit} alt=""/>
                        <div className={classes.editButtonText} onClick={editButtonHandler}>Редактировать профиль</div>
                    </button>
                ) : <div className={classes.enabledEdit}>
                    <button className={classes.enabledEditButtonClose}>
                        <img src={close} alt=""/>
                        <div onClick={cancelButtonHandler}>Отменить</div>
                    </button>
                    <button className={classes.enabledEditButtonAccept}>
                        <img src={accept} alt=""/>
                        <div onClick={saveButtonHandler}>Сохранить</div>
                    </button>
                </div>
            }
            <div className={classes.userProfileInfo}>
                <UserInfoPersonal img={group}><input disabled={!editButton} type="text" placeholder="ИСТ-777" value="ИСТ-777"/></UserInfoPersonal>
                <div className={classes.selectDiv}>
                    <img src={facultyImg} alt=""/>
                    <Select
                        isDisabled={!editButton}
                        options={options} styles={styles}
                        isSearchable={false} defaultValue={options[0]}
                        onChange={(e)=>facultyStateHandler(e.value)}/>
                </div>
                <UserInfoPersonal img={email}>vhod_v_1korpuse@gut.ru</UserInfoPersonal>
            </div>
            <div className={classes.eventCalendarInfo}>Меро на календаре</div>
            <Calendar/>
        </div>
    )
}

export default UserInfo;