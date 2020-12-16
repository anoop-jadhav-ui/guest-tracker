import styles from './Loader.module.css'
import Logo from '../Logo/Logo'
const Loader = () => {
    return (
        <div className={styles.loader}>
             <Logo></Logo>
            <div className={styles.wrapper}>
           
            <div className={styles.loading}>Loading<span className={styles.blue}>...</span></div>
            </div>
        </div>
    )
}

export default Loader;