
import styles from './ViewEvent.module.css'

import Button from '../../Components/Button/Button'
import ConfirmationPopover from '../../Components/ConfirmationPopover/ConfirmationPopover'
import React, { useEffect, useState } from 'react'

import axiosInstance from '../../axios'
import * as constants from '../../constants'

const ViewEventSection = (props) => {

    let date;
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (props.event.eventDate) {
        date = new Date(props.event.eventDate);
    }

    let [showConfirmPopover, setShowConfirmPopover] = useState();

    function updateGuestList() {
        try {
            props.goToSection('eventguests')
        } catch (e) {
            console.log(e);
        }
    }
    function addNewGuest() {
        try {
            props.goToSection('newguestconfirm')
        } catch (e) {
            console.log(e);
        }
    }
    function deleteEventHandler(evt) {
        try {
            setShowConfirmPopover(true);
            document.body.style.overflow = "hidden";
            setShowConfirmPopover(true);

        } catch (e) {
            document.body.style.overflow = "scroll";
            setShowConfirmPopover(false);
            console.log(e);
        }
    }
    function confirmHandler() {
        try {
            //code to delete the event
            props.showLoader(true);
            axiosInstance.delete(`/users/${props.userNodeId}/events/${props.event.nodeId}.json?auth=` + props.idToken)
                .then((res) => {
                    props.fetchEventsData('viewevent');
                    props.showLoader(false);
                    props.goToSection('welcome');

                    props.showHideBanner({ show: true, type: 'success', text: "Event Deleted Successfully." })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                }).catch(err => {
                    props.showLoader(false);
                    props.showHideBanner({ show: true, type: 'failed', text: "Event Deletion Failed. Please try again later." })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                })


            document.body.style.overflow = "scroll";
            setShowConfirmPopover(false);
        } catch (e) {
            document.body.style.overflow = "scroll";
            setShowConfirmPopover(false);
            console.log(e);
        }
    }
    function cancelHandler() {
        try {
            document.body.style.overflow = "scroll";
            setShowConfirmPopover(false);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <React.Fragment>
            <div className={styles.card + " gradient"}></div>
            <div className={styles.sectionTitle}>Venue Details</div>
            <div className={styles.venueDetailsWrapper}>
                <div className={styles.item}>
                    <div className={styles.label}>Address</div>
                    <div className={styles.data}>{props.event.eventAddress}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.data}>
                        {date.toLocaleDateString("en-US", options)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Time</div>
                    <div className={styles.data}>{props.event.eventTime + " hrs"}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Total Guests</div>
                    <div className={styles.data + ' bold large-text'}>{"guests" in props.event ? props.event.guests.length : '0'}</div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button className="margin-top-1" type="primary" onClick={addNewGuest}>Add New Guest</Button>
                <Button type="neutral" onClick={updateGuestList}>View/Update Guest List</Button>
                <Button className="margin-top-2" type="destructive-neutral" onClick={deleteEventHandler}>Delete this Event</Button>
            </div>

            {showConfirmPopover && <ConfirmationPopover confirmHandler={confirmHandler}
                cancelHandler={cancelHandler}
                confirmationText="Are you sure you want to delete this event?"
                helpText="Deleting this will remove the event. Although you can still add these guests in other events."
                confirmText="Confirm"
                cancelText="Cancel"
            ></ConfirmationPopover>}
        </React.Fragment>
    )
}
export default ViewEventSection;


