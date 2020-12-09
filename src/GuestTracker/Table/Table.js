import Wrapper from '../../HigherOrderFunc/HOF/Wrapper'
import styles from './Table.module.css'

const Table = (props) => {
    
    function removeCard(index) {

    }
    return (
        <div className={styles.table}>
            <div className='title'>Added Members</div>
            

            {/* {
                props.guestDetails.map((ele, index) => {
                    return (
                        <div key={ele.id} className={styles.row}>
                            <Wrapper>
                                <span className={styles.cross} onClick={removeCard(index)}></span>

                                <div className={styles.name}>
                                    <span className={styles.rowLabel}>Name</span>
                                    <span className={styles.rowData}>{ele.name}</span>
                                </div>
                                <div className={styles.contact}>
                                    <span className={styles.rowLabel}>Contact No</span>
                                    <span className={styles.rowData}>{ele.contact}</span>
                                </div>
                                <div className={styles.guestOf}>
                                    <span className={styles.rowLabel}>Guest Of</span>
                                    <span className={styles.rowData}>{ele.guestOf}</span>
                                </div>

                            </Wrapper>
                        </div>
                    )
                })
            } */}

        </div >
    )
}

export default Table;