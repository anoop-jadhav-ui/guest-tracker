import styles from './GuestListSection.module.css'
import { useState, useRef } from 'react'

import Input from '../../Components/Input/Input'

const GuestListSection = (props) => {
    console.log(props)
    let [searchGuestInput, setSearchGuestInput] = useState('');
    let searchInputRef = useRef();

    function searchChangeHandler() {

    }
    function checkboxChangeHandler(evt) {
        try{
            let targetGuestId = evt.target.dataset.guestId;


        }catch(e){
            console.log(e);
        }
    }
    return (
        <div className={styles.guestlistWrapper}>
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
                            Add Guests
                        </div>
                    </div>
                </div>
                <div className={styles.tableBody}>
                    {
                        props.allGuests !== undefined && props.allGuests.map((ele) => {
                            return (
                                <div key={ele.guestId} className={styles.row}>
                                    <div className={styles.td}>
                                        {ele.guestName}
                                    </div>
                                    <div className={styles.td}>
                                        {ele.contactNumber}
                                    </div>
                                    <div className={styles.td}>
                                        <input data-guest-id={ele.guestId} className={styles.checkbox} type="checkbox" onChange={checkboxChangeHandler}></input>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </div>
    )
}


export default GuestListSection;