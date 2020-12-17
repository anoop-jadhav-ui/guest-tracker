import Button from '../../Components/Button/Button'
import FloatingPanel from '../../Components/FloatingPanel/FloatingPanel'
import styles from './WelcomeSection.module.css'

const WelcomeSection = (props) => {

    function cardClickHandler(evt) {
        try {
            let eventId = evt.target.dataset.cardKey;
            props.cardClickHandler(eventId);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {props.events !== undefined && <div className={styles.sectionTitle}>List of all Events</div>}
            {
                props.events !== undefined && props.events.map(ele => {
                    return (
                        <div key={ele.eventId} className={styles.card + " gradient"} data-card-key={ele.eventId} onClick={cardClickHandler}>
                            <div className={styles.cardTitle}>{ele.eventName}</div>
                            <div className={styles.clickToViewButton}>{`Click to View Event >`}</div>
                        </div>
                    )
                })
            }
            <FloatingPanel>
                <Button type='primary' onClick={props.createNewEventHandler}>Create a New Event</Button>
            </FloatingPanel>
        </div>
    )
}

export default WelcomeSection;