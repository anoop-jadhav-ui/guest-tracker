
import styles from './ViewEvent.module.css'

import Button from '../../Components/Button/Button'

import React from 'react'

const ViewEventSection = (props) => {
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
                    <div className={styles.label}>Total Guest</div>
                    <div className={styles.data + ' bold large-text'}>100</div>
                </div>
            </div>
            <div className={styles.buttonWrapper}>
                <Button type="neutral">Update Guest List</Button>
                <Button type="primary">Add New Guest</Button>
            </div>
        </React.Fragment>
    )
}

export default ViewEventSection;


