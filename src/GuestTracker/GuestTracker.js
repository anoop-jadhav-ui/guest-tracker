import { PureComponent } from 'react'
import styles from './GuestTracker.module.css'
import Form from './GuestForm/GuestForm'
import Table from './Table/Table'

import './commonCss.css';

class GuestTracker extends PureComponent {
    state = {
        guestDetails: [
            {
                id:'1',
                name: 'Anoop Jadhav',
                contact: '7718944156',
                guestOf: 'groom'
            },
            {
                id:'2',
                name: 'Anoop Jadhav',
                contact: '7718944156',
                guestOf: 'groom'
            }
        ]
    }
    addGuest(guest){

        let guestDetailsTemp = [...this.state.guestDetails];
        guestDetailsTemp.push({
            id : (guestDetailsTemp.length + 1).toString() ,
            name: guest.name,
            contact: guest.contact,
            guestOf: guest.guestOf
        })
        this.setState(()=>{
            return {
                guestDetails: guestDetailsTemp
            }
        })

        console.log(this.guestDetails)
    }
    render() {
        return (
            <div className={styles.GuestTrackerApp}>
                 <div className='title'>Add Guests/Family Members</div>
                <Form addGuest={this.addGuest.bind(this)}></Form>
                <Table guestDetails={this.state.guestDetails}></Table>
                <div className={styles.buttonWrapper}>
                    <button className={styles.primaryButton}><span className={styles.buttonText}>Save Members</span></button>
                </div>
            </div>
        )
    }
}

export default GuestTracker;