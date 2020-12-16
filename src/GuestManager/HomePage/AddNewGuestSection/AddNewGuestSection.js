import styles from './AddNewGuestSection.module.css'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import * as constants from '../../constants'
import axiosInstance from '../../axios'
import { getId } from '../../Iterators'
const AddNewGuestSection = (props) => {

    //States
    let [eventName, setEventName] = useState(props.event.eventName);
    let [guestName, setGuestName] = useState('');
    let [contact, setContact] = useState('');
    let [guestOf, setGuestOf] = useState('');
    let [familyName, setFamilyName] = useState('');

    //refs
    let guestNameRef = useRef();
    let contactRef = useRef();
    let guestOfRef = useRef();
    let familyNameRef = useRef();
    let eventNameRef = useRef();

    let [options, setOptions] = useState([{
        id: 0,
        label: 'Bride',
        value: 'Bride',
        checked: false
    }, {
        id: 1,
        label: 'Groom',
        value: 'Groom',
        checked: false
    }]);

    useEffect(() => {
        if (props.selectedGuest !== undefined) {
            setGuestName(props.selectedGuest.guestName);
            setContact(props.selectedGuest.contactNumber);
            setGuestOf(props.selectedGuest.guestOf);
            setOptionFun(props.selectedGuest.guestOf);
            setFamilyName(props.selectedGuest.familyName);
        }

    }, [props.selectedGuest])
    //functions

    function setOptionFun(inputValue) {
        try {
            let flag = false;
            let optionsTemp = [...options];
            optionsTemp.forEach(ele => {
                if (ele.value === inputValue) {
                    ele.checked = true;
                    flag = true;
                } else {
                    ele.checked = false;
                }
            })
            setOptions(optionsTemp);
            return true;
        } catch (e) {
            console.log(e);
        }
    }
    function changeHandler(evt) {
        try {
            let inputName = evt.target.name;
            let inputValue = evt.target.value;

            switch (inputName) {
                case 'guestname':
                    setGuestName(inputValue);
                    if (inputValue !== '') {
                        guestNameRef.current.removeHighlights();
                    } else {
                        guestNameRef.current.highlightInput();
                    }
                    break;
                case 'contact':
                    setContact(inputValue);
                    if (inputValue !== '') {
                        contactRef.current.removeHighlights();
                    } else {
                        contactRef.current.highlightInput();
                    }
                    break;
                case 'guestof':
                    setOptionFun(inputValue);
                    setGuestOf(inputValue);
                    break;
                case 'familyname':
                    setFamilyName(inputValue);
                    if (inputValue !== '') {
                        familyNameRef.current.removeHighlights();
                    } else {
                        familyNameRef.current.highlightInput();
                    }
                    break;
                default: break;
            }

        } catch (e) {
            console.log(e);
        }
    }

    function checkIfValuesChanged() {
        try {
            let flag = false;
            if (contact !== props.selectedGuest.contactNumber) flag = true;
            if (guestOf !== props.selectedGuest.guestOf) flag = true;
            if (familyName !== props.selectedGuest.familyName) flag = true;
            if (guestName !== props.selectedGuest.guestName) flag = true;

            return flag;

        } catch (e) {
            console.log(e);
        }
    }
    function saveEventHandler(evt) {
        try {
            let validated = validateInputs();
            if (validated) {
                let payload;
                if (props.selectedGuest !== undefined) {
                    payload = {
                        contactNumber: contact,
                        familyName: familyName,
                        guestOf: guestOf,
                        guestName: guestName,
                    }

                    let changed = checkIfValuesChanged();
                    if (changed) {

                        let nodeId;
                        props.allGuests.forEach(ele => {
                            if (ele.guestId === props.selectedGuest.guestId) {
                                nodeId = ele.nodeId;
                            }
                        })

                        axiosInstance.patch(`/users/${props.userNodeId}/allGuests/${nodeId}.json?auth=` + props.idToken, payload)
                            .then((res) => {
                                //Add the same guest in all guests json
                                props.fetchEventsData('editguest')
                                props.showHideBanner({ show: true, type: 'success', text: "Guest Updated Successfully." })
                                setTimeout(() => {
                                    props.showHideBanner({ show: false, type: '', text: '' })
                                    props.goToSection('eventguests');
                                }, constants.BANNER_TIME);
                            }).catch((err) => {
                                props.showHideBanner({ show: true, type: 'failed', text: "Sorry couldn't update data. Please try again later." })
                                setTimeout(() => {
                                    props.showHideBanner({ show: false, type: '', text: '' })
                                    props.goToSection('eventguests');
                                }, constants.BANNER_TIME);
                            })

                    } else {
                        props.showHideBanner({ show: true, type: 'warning', text: "Nothing has Changed." })
                        setTimeout(() => {
                            props.showHideBanner({ show: false, type: '', text: '' })
                        }, constants.BANNER_TIME);
                    }

                } else {

                    let newGuestId = getId.next().value;
                    payload = {
                        contactNumber: contact,
                        familyName: familyName,
                        guestOf: guestOf,
                        guestName: guestName,
                        guestId: newGuestId
                    }

                    axiosInstance.post(`/users/${props.userNodeId}/allGuests.json?auth=` + props.idToken, payload)
                        .then((res) => {

                            let eventGuestPayload = {
                                guestId: newGuestId
                            }
                            //Add the same guest in all guests json
                            axiosInstance.post(`/users/${props.userNodeId}/events/${props.event.nodeId}/guests.json?auth=` + props.idToken, eventGuestPayload)
                                .then((res) => {
                                    props.showHideBanner({ show: true, type: 'success', text: "Guest Added Successfully." })
                                    setTimeout(() => {
                                        props.fetchEventsData('newguest')
                                        props.showHideBanner({ show: false, type: '', text: '' })
                                        props.goToSection('viewevent');
                                    }, constants.BANNER_TIME);
                                })

                        }).catch((err) => {
                            props.showHideBanner({ show: true, type: 'failed', text: "Sorry couldn't update data. Please try again later." })
                            setTimeout(() => {
                                props.showHideBanner({ show: false, type: '', text: '' })
                                props.goToSection('viewevent');
                            }, constants.BANNER_TIME);
                        })
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    function validateInputs() {
        try {
            let flag = true;
            if (guestName === '') {
                flag = false;
                guestNameRef.current.highlightInput();
            } else {
                guestNameRef.current.removeHighlights();
            }
            if (contact === '') {
                flag = false;
                contactRef.current.highlightInput();

            } else if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(contact)) {
                flag = false;
                contactRef.current.highlightInput('Please enter a valid contact number.');
            } else {
                contactRef.current.removeHighlights();
            }

            if (guestOf === '') {
                flag = false;
                guestOfRef.current.highlightInput();
            } else {
                guestOfRef.current.removeHighlights();
            }
            return flag;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="padding-top-2">
            <div className="inputWrapper">
                <Input label="Event Name" ref={eventNameRef} name="eventname" type="text" value={eventName} onChange={changeHandler} disabled={true}></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Guest Name" ref={guestNameRef} name="guestname" type="text" value={guestName} onChange={changeHandler} placeholder="for eg. Cooper, Kristin"></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Contact Numer" ref={contactRef} name="contact" type="number" value={contact} onChange={changeHandler}></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Guest Of" ref={guestOfRef} name="guestof" type="radio" options={options} value={guestOf} onChange={changeHandler}></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Family Name/Group Name (optional)" ref={familyNameRef} name="familyname" type="text" value={familyName} onChange={changeHandler}></Input>
            </div>

            <div className={styles.buttonWrapper}>
                <Button type="primary" onClick={saveEventHandler}>Save Guest</Button>
            </div>
        </div>

    )
}

export default AddNewGuestSection;