import styles from './GuestListSection.module.css'
import React, { useState, useRef, useEffect } from 'react'

import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import FloatingPanel from '../../Components/FloatingPanel/FloatingPanel'
import ConfirmationPopover from '../../Components/ConfirmationPopover/ConfirmationPopover'

import axiosInstance from '../../axios'
import * as constants from '../../constants'

const GuestListSection = (props) => {

    let [searchGuestInput, setSearchGuestInput] = useState('');
    let searchInputRef = useRef();
    let [guestListState, setGuestListState] = useState(props.allGuests);
    let [tempGuestListState, setTempGuestListState] = useState();
    let [selectAllText, setSelectAllText] = useState();
    let [showConfirmPopover, setShowConfirmPopover] = useState();
    let [deletedGuestId, setDeletedGuestId] = useState();

    useEffect(() => {
        if (props.type === 'allguests') {
            let intersection = [];
            if (guestListState) {
                let tempGuestListState = [...guestListState];
                tempGuestListState.forEach(ele => {
                    ele.checked = false;
                })

                if ('guests' in props.event && props.event.guests.length >= 1) {
                    tempGuestListState.forEach(ele => {

                        let guestPresent = checkIfGuestPresentInSelectedEvent(ele.guestId);
                        if (!guestPresent) {
                            intersection.push(ele);
                        }
                    })
                } else {
                    intersection = tempGuestListState;
                }
            }

            setTempGuestListState(intersection);
            setGuestListState(intersection);
            setSelectAllText('Select All')


        } else if (props.type === 'eventguests') {
            let eventList = [];
            if (guestListState) {
                let tempGuestListState = [...guestListState];

                //get guests from allGuests using ID in the event
                if ('guests' in props.event && props.event.guests.length >= 1) {
                    tempGuestListState.forEach(ele => {
                        let guestPresent = checkIfGuestPresentInSelectedEvent(ele.guestId);
                        if (guestPresent) {
                            eventList.push(ele);
                        }
                    })
                }
            }
            setTempGuestListState(eventList);
            setGuestListState(eventList);
            setSelectAllText('Select All')

        }
    }, [])

    function checkIfGuestPresentInSelectedEvent(key) {
        try {
            let flag = false;
            props.event.guests.forEach(ele => {
                if (ele.guestId === key) {
                    flag = true;
                }
            })
            return flag;
        } catch (e) {
            console.log(e);
        }
    }
    function searchChangeHandler(evt) {
        let inputVal = evt.target.value;
        setSearchGuestInput(inputVal);

        let tempGuestListState = [...guestListState];
        tempGuestListState = tempGuestListState.filter(ele => {
            if (ele.guestName.toLowerCase().startsWith(inputVal)) {
                return true
            } else {
                return false;
            }
        })

        setTempGuestListState(tempGuestListState);
    }
    function checkboxChangeHandler(evt) {
        try {
            let targetGuestId = parseInt(evt.target.dataset.guestId);
            let tempGuestListState = [...guestListState];
            tempGuestListState.forEach(ele => {
                if (ele.guestId === targetGuestId) {
                    ele.checked = !ele.checked;
                }
            })
            setTempGuestListState(tempGuestListState);
            setGuestListState(tempGuestListState);

        } catch (e) {
            console.log(e);
        }
    }
    function selectAllHandler() {
        try {
            if (selectAllText === 'Select All') {
                let tempGuestListState = [...guestListState];
                tempGuestListState.forEach(ele => {
                    ele.checked = true;
                })
                setTempGuestListState(tempGuestListState);
                setGuestListState(tempGuestListState);

                setSelectAllText('Deselect All');
            } else if (selectAllText === 'Deselect All') {
                let tempGuestListState = [...guestListState];
                tempGuestListState.forEach(ele => {
                    ele.checked = false;
                })
                setTempGuestListState(tempGuestListState);
                setGuestListState(tempGuestListState);

                setSelectAllText('Select All');
            }
        } catch (e) {
            console.log(e);
        }
    }
    function editHandler(evt) {
        try {
            if (evt && "currentTarget" in evt && evt.currentTarget.dataset.guestId) {
                let srcGuestId = evt.currentTarget.dataset.guestId;
                let eleToBeUpdated;

                guestListState.forEach(ele => {
                    if (ele.guestId === parseInt(srcGuestId)) {
                        eleToBeUpdated = ele;
                    }
                })
                props.editGuestDetails(eleToBeUpdated);
            }
        } catch (e) {
            console.log(e);
        }
    }
    function deleteHandler(evt) {
        try {
            if (evt && "currentTarget" in evt && evt.currentTarget.dataset.guestId) {
                setDeletedGuestId(evt.currentTarget.dataset.guestId);
                setShowConfirmPopover(true);
            }

        } catch (e) {
            console.log(e);
        }
    }
    function addExistingGuestshandler() {
        try {
            //check if anything checked or not 
            let selectedGuestList = [];
            guestListState.forEach(ele => {
                if (ele.checked === true) {
                    selectedGuestList.push(ele);
                }
            })

            if (selectedGuestList.length > 0) {
                //patch these to the main event guest list 
                let eventGuestList;
                if ("guests" in props.event) {
                    eventGuestList = [...props.event.guests];
                    selectedGuestList = selectedGuestList.concat(eventGuestList);
                }

                selectedGuestList.forEach(ele => {
                    Object.keys(ele).forEach((key) => {
                        if (key !== "guestId") {
                            delete ele[key];
                        }
                    })
                })

                let payload = { ...selectedGuestList };
                props.showLoader(true);
                //Make a server call 
                axiosInstance.put(`/users/${props.userNodeId}/events/${props.event.nodeId}/guests.json?auth=` + props.idToken, payload)
                    .then((res) => {
                        props.showLoader(false);
                        props.fetchEventsData('allguests');
                        props.goToSection('viewevent');
                        props.showHideBanner({ show: true, type: 'success', text: "Guest Added Successfully." })
                        setTimeout(() => {
                            props.showHideBanner({ show: false, type: '', text: '' })
                        }, constants.BANNER_TIME);
                    }).catch(err => {
                        props.showLoader(false);
                        console.log(err);
                        props.goToSection('viewevent');
                        props.showHideBanner({ show: true, type: 'failed', text: "Guest couldn't be Added. Please try again later." })
                        setTimeout(() => {
                            props.showHideBanner({ show: false, type: '', text: '' })
                        }, constants.BANNER_TIME);
                    })

            } else {
                //nothing selected
                props.showHideBanner({ show: true, type: 'warning', text: "Please select guests." })
                setTimeout(() => {
                    props.showHideBanner({ show: false, type: '', text: '' })
                }, constants.BANNER_TIME);
            }



        } catch (e) {
            console.log(e);
        }
    }

    function cancelHandler() {
        try {
            setShowConfirmPopover(false);
        } catch (e) {
            console.log(e);
        }
    }
    function confirmHandler() {
        try {

            let srcGuestId = deletedGuestId;

            let eleToBeDeleted;
            props.event.guests.forEach(ele => {
                if (ele.guestId === parseInt(srcGuestId)) {
                    eleToBeDeleted = ele;
                }
            })
            props.showLoader(true);
            axiosInstance.delete(`/users/${props.userNodeId}/events/${props.event.nodeId}/guests/${eleToBeDeleted.nodeId}.json?auth=` + props.idToken)
                .then((res) => {
                    props.showLoader(false);
                    props.fetchEventsData('eventguests');
                    props.goToSection('viewevent');

                    props.showHideBanner({ show: true, type: 'success', text: "Guest Deleted Successfully." })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                }).catch(err => {
                    props.showLoader(false);
                    props.showHideBanner({ show: true, type: 'failed', text: "Guest Deleted Failed. Please try again later." })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                })

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={styles.guestlistWrapper}>
            { props.type === 'allguests' && <div className={styles.selectAllButton}>
                <Button type="secondary" onClick={selectAllHandler}>
                    {selectAllText}
                </Button>
            </div>}
            <Input type="text" name="search guests" ref={searchInputRef} value={searchGuestInput} placeholder={props.placeholder} onChange={searchChangeHandler}></Input>

            <div className={styles.guestTable}>
                <div className={styles.tableHeader}>
                    <div className={styles.row}>
                        <div className={styles.th}>
                            Name
                        </div>
                        <div className={styles.th}>
                            Contact Number
                        </div>
                        <div className={styles.th}>
                            {props.type === 'allguests' ? 'Add Guests' : 'Actions'}
                        </div>
                    </div>
                </div>
                <div className={styles.tableBody}>
                    {
                        tempGuestListState !== undefined && tempGuestListState.map((ele) => {
                            return (
                                <div key={ele.guestId} className={styles.row}>
                                    <div className={styles.td}>
                                        {ele.guestName}
                                    </div>
                                    <div className={styles.td}>
                                        {ele.contactNumber}
                                    </div>
                                    <div className={styles.td}>
                                        {props.type === 'allguests' ?
                                            <input data-guest-id={ele.guestId} checked={ele.checked} className={styles.checkbox} type="checkbox" onChange={checkboxChangeHandler}></input>
                                            :
                                            <div className={styles.buttonsWrapper}>
                                                <Button type="secondary" data-guest-id={ele.guestId} onClick={editHandler}><ion-icon className="icon" name="create-outline" data-guest-id={ele.guestId} onClick={editHandler}></ion-icon></Button>
                                                <Button type="secondary" data-guest-id={ele.guestId} onClick={deleteHandler}><ion-icon className="red" name="trash-outline" data-guest-id={ele.guestId} onClick={deleteHandler}></ion-icon></Button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                {props.type === 'allguests' && <FloatingPanel>
                    <Button type="primary" onClick={addExistingGuestshandler}>Add Guests</Button>
                </FloatingPanel>}
                {showConfirmPopover && <ConfirmationPopover confirmHandler={confirmHandler}
                    cancelHandler={cancelHandler}
                    confirmationText="Are you sure you want to delete this Guest?"
                    helpText="Deleting this will remove the Guest from this event. Although you can still add this guest from the existing Guest list Add option."
                    confirmText="Confirm"
                    cancelText="Cancel"
                ></ConfirmationPopover>}

            </div>
        </div>
    )
}


export default GuestListSection;