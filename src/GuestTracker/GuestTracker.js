import { PureComponent } from 'react'
import styles from './GuestTracker.module.css'
import Form from './GuestForm/GuestForm'
import Table from './Table/Table'
import firebase from "./firebaseConfig.js";
import './commonCss.css';

let dataBase = firebase.database();

class GuestTracker extends PureComponent {

    state = {
        guestDetails: []
    }

    componentDidMount() {
        try {
            // let rootRef = dataBase.ref().child("/");
            // rootRef.on("value", (snapshot) => {
            //     console.log(snapshot.val());
            //     let tempArray = [];

            //     let data = JSON.parse(JSON.stringify(snapshot.val()));
                
            //     this.setState(() => {
            //         return {
            //             guestDetails: data
            //         };
            //     });
            //     console.log(data);
            // });
            

        } catch (e) {
            console.log(e);
        }
    }

    addGuest(guest) {
        try{
            let totalGuestDetailsTemp = [...this.state.guestDetails];

            let currentGuestData = {
                id: (totalGuestDetailsTemp.length + 1).toString(),
                name: guest.name,
                contact: guest.contact,
                guestOf: guest.guestOf
            }
    
            totalGuestDetailsTemp.push(currentGuestData);
    
            this.setState(() => {
                return {
                    guestDetails: totalGuestDetailsTemp
                }
            })
            console.log(this.state.guestDetails);
            let rootRef = dataBase.ref().child("/");
            rootRef.push().set(currentGuestData);

        }catch(e){
            console.log(e);
        }
    }
    render() {
        if (this.state.guestDetails) {
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
        }else{
            return null
        }
    }
}

export default GuestTracker;