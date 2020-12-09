import styles from './Banner.module.css'
import React from 'react'

const Banner = (props) => {
    let type;
    if (props.type) {
        type = props.type;
    } else {
        type = 'success'
    }

    return (
        <React.Fragment>
            <div className={styles.Baner + ' ' + styles[type]}>
                {props.text}
            </div>
        </React.Fragment>
    )
}

export default Banner;