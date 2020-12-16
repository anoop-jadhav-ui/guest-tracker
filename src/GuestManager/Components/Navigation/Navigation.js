import Button from '../Button/Button'
import styles from './Navigation.module.css'

const Navigation = (props) => {

    return (
        <div className={styles.NavigationWrapper}>
            <div>
                {props.showBackButton && <Button type="secondary" onClick={props.onGoBack}><div className={styles.arrow}></div> Back</Button>}
            </div>
            <div>
                {props.showLogoutButton && <Button type="secondary" onClick={props.logoutHandler}>Logout</Button>}
            </div>
        </div>
    )
}

export default Navigation;