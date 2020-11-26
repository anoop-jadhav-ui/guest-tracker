import Wrapper from '../../HigherOrderFunc/HOF/Wrapper'
import styles from './Table.module.css'

const Table = (props) => {
    
    function removeCard(index) {

    }
    return (
        <div className={styles.table}>
            <div className='title'>Added Members</div>
            {
                props.guestDetails.map((ele, index) => {
                    return (
                        <div key={ele.id} className={styles.row}>
                            <Wrapper>
                                <span className={styles.cross} onClick={removeCard(index)}></span>
                                {Object.keys(ele).map((item) => {
                                    return (
                                        item !== 'id' ? <div key={item} className={styles[item]}>
                                            <span className={styles.rowLabel}>{item}</span>
                                            <span className={styles.rowData}>{ele[item]}</span>
                                        </div> : null
                                    )
                                })}
                            </Wrapper>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Table;