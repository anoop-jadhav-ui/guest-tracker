import styles from './Page.module.css'

const Page = (props) => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.NavigationButtons}>
                {props.navigation}
            </div>
            <div className={styles.header}>
                {props.header}
            </div>
            <div className={styles.body}>
                {props.body}
            </div>
        </div>
    )
}

export default Page;