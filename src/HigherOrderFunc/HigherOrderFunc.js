import { Component } from 'react'
import styles from './HigherOrderFunc.module.css'

import Parent from './ParentCmp/ParentCmp'


class HigherOrderFunc extends Component {
    render() {
        return (
            <div className={styles.higherOrderFun}>
                <div className={styles.title}>Higher Order Functions</div>
                <Parent></Parent>
            </div>
        )
    }
}


export default HigherOrderFunc;