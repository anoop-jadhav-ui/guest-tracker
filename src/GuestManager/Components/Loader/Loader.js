import styles from './Loader.module.css'
import Logo from '../Logo/Logo'
const Loader = () => {
    return (
        <div className={styles.loader}>
             <Logo></Logo>
            <div className={styles.wrapper}>
           
            <div className={styles.loading}>Loading...</div>
            </div>
        </div>
    )
}

export default Loader;