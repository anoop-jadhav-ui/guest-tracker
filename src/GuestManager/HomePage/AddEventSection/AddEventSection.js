import styles from './AddEventSection.module.css'

import React, { useRef, useState } from 'react'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import * as constants from '../../constants'
import axiosInstance from '../../axios'
import { getId } from '../../Iterators'

const AddEventSection = (props) => {
    //States
    let [eventName, setEventName] = useState('');
    let [date, setDate] = useState('');
    let [time, setTime] = useState('');
    let [address, setAddress] = useState('');
    let [location, setLocation] = useState('');

    //refs
    let eventNameRef = useRef();
    let dateRef = useRef();
    let timeRef = useRef();
    let addressRef = useRef();
    let locationRef = useRef();


    //functions
    function changeHandler(evt) {
        try {
            let inputName = evt.target.name;
            let inputValue = evt.target.value;

            switch (inputName) {
                case 'eventname':
                    setEventName(inputValue);
                    if (inputValue !== '') {
                        eventNameRef.current.removeHighlights();
                    } else {
                        eventNameRef.current.highlightInput();
                    }
                    break;
                case 'date':
                    setDate(inputValue);
                    if (inputValue !== '') {
                        dateRef.current.removeHighlights();
                    } else {
                        dateRef.current.highlightInput();
                    }
                    break;
                case 'time':
                    setTime(inputValue);
                    if (inputValue !== '') {
                        timeRef.current.removeHighlights();
                    } else {
                        timeRef.current.highlightInput();
                    }
                    break;
                case 'address':
                    setAddress(inputValue);
                    if (inputValue !== '') {
                        addressRef.current.removeHighlights();
                    } else {
                        addressRef.current.highlightInput();
                    }
                    break;
                default: break;
            }

        } catch (e) {
            console.log(e);
        }
    }
    function saveEventHandler(evt) {
        try {
            let validated = validateInputs();
            if (validated) {
                let payload = {
                    userName: props.loggedInUserName,
                    eventAddress: address,
                    eventDate: date,
                    eventTime: time,
                    eventName: eventName,
                    eventId: getId.next().value
                }
                axiosInstance.post(`/users/${props.userNodeId}/events.json?auth=` + props.idToken, payload)
                    .then((res) => {
                        props.fetchEventsData('addevent');
                        props.showHideBanner({ show: true, type: 'success', text: "Event Created Successfully." })
                        setTimeout(() => {
                            props.showHideBanner({ show: false, type: '', text: '' })
                            props.goToSection('welcome');
                        }, constants.BANNER_TIME);
                    }).catch((err) => {
                        props.showHideBanner({ show: true, type: 'failed', text: "Sorry couldn't update data. Please try again later." })
                        setTimeout(() => {
                            props.showHideBanner({ show: false, type: '', text: '' })
                            props.goToSection('welcome');
                        }, constants.BANNER_TIME);
                    })
            }
        } catch (e) {
            console.log(e);
        }
    }
    function validateInputs() {
        try {
            let flag = true;
            if (eventName === '') {
                flag = false;
                eventNameRef.current.highlightInput();
            } else {
                eventNameRef.current.removeHighlights();
            }
            if (date === '') {
                flag = false;
                dateRef.current.highlightInput();
            } else {
                dateRef.current.removeHighlights();
            }
            if (time === '') {
                flag = false;
                timeRef.current.highlightInput();
            } else {
                timeRef.current.removeHighlights();
            }
            if (address === '') {
                flag = false;
                addressRef.current.highlightInput();
            } else {
                addressRef.current.removeHighlights();
            }
            return flag;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="padding-top-2">
            <div className="inputWrapper">
                <Input label="Event Name" ref={eventNameRef} name="eventname" type="text" value={eventName} onChange={changeHandler} placeholder="for eg. Georgia's Wedding"></Input>
            </div>
            <div className="inputWrapperRow">
                <div className="inputWrapper dateInput">
                    <Input label="Date" ref={dateRef} name="date" type="date" value={date} onChange={changeHandler}></Input>
                </div>
                <div className="inputWrapper timeInput">
                    <Input label="Time" ref={timeRef} name="time" type="time" value={time} onChange={changeHandler}></Input>
                </div>
            </div>
            <div className="inputWrapper">
                <Input label="Address" ref={addressRef} name="address" type="textarea" value={address} onChange={changeHandler} placeholder="for eg. 2118 Thornridge Cir. Syracuse, Connecticut 35624"></Input>
            </div>
            {/* <div className="inputWrapper">
                <Input label="Password" ref={locationRef} name="location" type="password" value={location} onChange={changeHandler} placeholder='***********'>></Input>
            </div> */}
            <div className={styles.buttonWrapper}>
                <Button type="primary" onClick={saveEventHandler}>Save Event</Button>
            </div>
        </div>

    )
}

export default AddEventSection;