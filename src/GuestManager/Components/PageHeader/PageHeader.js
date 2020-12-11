import styles from './PageHeader.module.css'
import React from 'react'

const PageHeader = (props) => {
    return (
        <React.Fragment>
            <div className={styles.header}>
                {props.header}
            </div>
            <div className={styles.subHeader}>
                {props.subHeader}
            </div>
        </React.Fragment>
    )
}

export default PageHeader;