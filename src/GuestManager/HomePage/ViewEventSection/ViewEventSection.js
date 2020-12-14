
import styles from './ViewEvent.module.css'

import Button from '../../Components/Button/Button'

import React, { useEffect } from 'react'

const ViewEventSection = (props) => {
    useEffect(()=>{

    },[props.event.guests])
    function updateGuestList(){
        try{
            props.goToSection('allguests')
        }catch(e){
            console.log(e);
        }
    }
    function addNewGuest(){
        try{
            props.goToSection('newguest')
        }catch(e){
            console.log(e);
        }
    }
    return (
        <React.Fragment>
            <div className={styles.card}></div>
            <div className={styles.sectionTitle}>Venue Details</div>
            <div className={styles.venueDetailsWrapper}>
                <div className={styles.item}>
                    <div className={styles.label}>Address</div>
                    <div className={styles.data}>{props.event.eventAddress}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Date</div>
                    <div className={styles.data}>{props.event.eventDate + ' - ' + props.event.eventTime}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Total Guests</div>
                    <div className={styles.data + ' bold large-text'}>{"guests" in props.event ? props.event.guests.length : '0'}</div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button type="neutral" onClick={updateGuestList}>Update Guest List</Button>
                <Button type="primary" onClick={addNewGuest}>Add New Guest</Button>
            </div>
        </React.Fragment>
    )
}
export default ViewEventSection;


