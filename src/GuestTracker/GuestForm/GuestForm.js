import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import styles from './GuestForm.module.css'

const Form = (props) => {
    let [name, setNameState] = useState('');
    let [contact, setContactState] = useState('');
    let [guestOf, setGuestOfState] = useState('');

    function changeHandler(Event) {
        let eleName = Event.currentTarget.name;
        let eleValue = Event.currentTarget.value;
        if (eleName === 'name') {
            setNameState(eleValue);
        } else if (eleName === 'contact') {
            setContactState(eleValue)
        } else if (eleName === 'guestof') {
            setGuestOfState(eleValue)
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.formWrapper}>
                <div className={styles.inputWrapper}>
                    <label className={styles.label} htmlFor="name">Guest Name</label>
                    <input className={styles.input} name="name" type="text" value={name} onChange={changeHandler}></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.label} htmlFor="contact">Contact Number</label>
                    <input className={styles.input} name="contact" type="text" value={contact} onChange={changeHandler}></input>
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.label} htmlFor="guestof">Guest of</label>
                    <div className={styles.radioWrapper}><input className={styles.radio} name="guestof" type="radio" value='bride' onChange={changeHandler} /><span>Bride</span></div>
                    <div className={styles.radioWrapper}><input className={styles.radio} name="guestof" type="radio" value='groom' onChange={changeHandler} /><span>Groom</span></div>
                </div>
                <div className={styles.addMemButton}>
                    <button className='secondaryButton' onClick={() => {
                        props.addGuest({
                            name,
                            contact,
                            guestOf
                        })
                    }}> <span className='icon'>+</span> <span className='buttonText'>Add Member</span></button>
                </div>
                <div className={styles.notesWrapper}>
                <div className={styles.infoText}>Fill this form and add your family members/guests who will be coming to the event. This will help us properly manage the event in this pandemic situation. </div>
                <div className={styles.infoText}>Only add the members who will surely be present for the event. After adding the members save it using the save members button at the bottom</div>
                </div>
            </div>
        </div>
    )
}

export default Form;