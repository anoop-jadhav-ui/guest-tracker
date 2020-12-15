import styles from './FloatingPanel.module.css'

const FloatingButton = (props) =>{
    let customClass;
    if(!props.float){
        customClass = 'bottom';
    }
    return (
        <div className={styles.floatingPanel +' '+ styles[customClass]}>
            {props.children}
        </div>
    )
}

export default FloatingButton;