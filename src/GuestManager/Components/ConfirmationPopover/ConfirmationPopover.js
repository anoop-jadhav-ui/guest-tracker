import styles from './ConfirmationPopover.module.css'
import Button from '../Button/Button'

const ConfirmationPopover = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.elements}>
                <div className={styles.text}>
                    {props.confirmationText}
                </div>
                <div className={styles.helptext}>
                    {props.helpText}
                </div>

                <Button className="margin-top-1" type="neutral" onClick={props.confirmHandler}>{props.confirmText}</Button>
                <Button type="primary" onClick={props.cancelHandler}>{props.cancelText}</Button>
            </div>
        </div>
    )
}
export default ConfirmationPopover;