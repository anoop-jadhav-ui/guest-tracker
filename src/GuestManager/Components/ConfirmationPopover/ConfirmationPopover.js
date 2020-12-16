import styles from './ConfirmationPopover.module.css'
import Button from '../Button/Button'
import { useState } from 'react'

const ConfirmationPopover = (props) => {

     useState(()=>{
        document.body.style.overflow = "hidden";
    },[])

    function confirmHandler(){
        try{
            document.body.style.overflow = "scroll";
            props.confirmHandler();
        }catch(e){
            document.body.style.overflow = "scroll";
            console.log(e);
        }
    }
    function cancelHandler(){
        try{
            document.body.style.overflow = "scroll";
            props.cancelHandler();
        }catch(e){
            document.body.style.overflow = "scroll";
            console.log(e);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.elements}>
                <div className={styles.text}>
                    {props.confirmationText}
                </div>
                <div className={styles.helptext}>
                    {props.helpText}
                </div>

                <Button className="margin-top-1" type="neutral" onClick={confirmHandler}>{props.confirmText}</Button>
                <Button type="primary" onClick={cancelHandler}>{props.cancelText}</Button>
            </div>
        </div>
    )
}
export default ConfirmationPopover;