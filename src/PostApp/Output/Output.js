import styles from '../Output/Output.module.css'

const Output = (props) => {
    return (
        <div className={styles.output}> {
            props.posts.map((post, index) => {
                return (
                    <div className={styles.post} key={index}>
                        <div className={styles.id}>{post.id + '.'}</div>
                        <div className={styles.body}>
                            <div className={styles.title}>{post.title}</div>
                            <div className={styles.content}>{post.body}</div>
                        </div>

                    </div>
                )
            })
        }
        </div>
    )
}

export default Output;