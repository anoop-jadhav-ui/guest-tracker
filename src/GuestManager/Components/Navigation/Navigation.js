import Button from '../Button/Button'
import styles from './Navigation.module.css'

import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
const Navigation = (props) => {

    let routeHistory = useHistory();

    function logoutHandler() {
        try {
            //clear token & userid
            props.clearToken();
        
            props.showHideBanner({ show: true, type: 'warning', text: 'Logging out. Redirecting...' })
            setTimeout(() => {
                props.showHideBanner({ show: false, type: '', text: '' })
                routeHistory.push('/');
            }, 3000);
           
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.NavigationWrapper}>
            <div>
                {props.showBackButton && <Button type="secondary" onClick={props.onGoBack}><div className={styles.arrow}></div> Back</Button>}
            </div>
            <div>
                {props.showLogoutButton && <Button type="secondary" onClick={logoutHandler}>Logout</Button>}
            </div>
        </div>
    )
}

const mapStoreToProps = (store) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearToken: () => dispatch(actions.clearToken()),
        showHideBanner: (data) => dispatch(actions.showBannerAction(data)),
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Navigation);