import styles from './AddEventSection.module.css'

import React,{useRef, useState} from 'react'
import Button from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'

const AddEventSection = (props) => {
    //States
    let [eventName,setEventName] = useState();
    let [date,setDate] = useState();
    let [time,setTime] = useState();
    let [Address,setAddress] = useState();
    let [location,setLocation] = useState();
    

    //refs
    let eventNameRef = useRef();
    let dateRef = useRef();
    let timeRef = useRef();
    let addressRef = useRef();
    let locationRef = useRef();


    //functions
    function changeHandler(){
        try{

        }catch(e){
            console.log(e);
        }
    }

    return (
        <React.Fragment>

            <div className="inputWrapper">
                <Input label="Event Name" ref={eventNameRef} name="eventname" type="text" value={eventName} onChange={changeHandler} placeholder='georgia.young@example.com'></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Date" ref={dateRef} name="date" type="date" value={date} onChange={changeHandler} placeholder='***********'></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Time" ref={timeRef} name="time" type="time" value={time} onChange={changeHandler} placeholder='***********'></Input>
            </div>
            <div className="inputWrapper">
                <Input label="Address" ref={addressRef} name="address" type="password" value={Address} onChange={changeHandler} placeholder='***********'></Input>
            </div>
            {/* <div className="inputWrapper">
                <Input label="Password" ref={locationRef} name="location" type="password" value={location} onChange={changeHandler} placeholder='***********'>></Input>
            </div> */}
            <div className={styles.buttonWrapper}>
                <Button type="primary">Save Event</Button>
            </div>

        </React.Fragment>

    )
}

export default AddEventSection;