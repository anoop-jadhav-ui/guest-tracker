import { useState } from 'react';
import styles from './Form.module.css'

const Form = (props) => {


    const [titleState, setTitleState] = useState('');
    const [contentState, setContentState] = useState('');

    function changeHandler(Event) {
        try {
            let eleName = Event.currentTarget.name;
            let eleValue = Event.currentTarget.value;
            if (eleName === 'title') {
                setTitleState(eleValue);
            } else if (eleName === 'content') {
                setContentState(eleValue)
            }
        } catch (e) {
            console.log(e);
        }
    }

    function submitPost() {
        try {
            let id = Math.floor(Math.random() * 1000);
            let data = {
                'userId': id,
                'id': id,
                'title': titleState,
                'body': contentState
            }
            this.submitPostRequest(data)
            
        } catch (e) {
            console.log(e);
        }
    }
    function clearValues() {
        try {
            //Clear values
            setTitleState("");
            setContentState("")

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={styles.form}>
            <h4>Make a note</h4>
            <div className={styles.inputBlock}>
                <label className={styles.label} htmlFor="title">Title</label>
                <input className={styles.input} type="text" value={titleState} name="title" onChange={changeHandler} />
            </div>
            <div className={styles.inputBlock}>
                <label className={styles.label} htmlFor="content">Content</label>
                <textarea className={styles.textarea} type="text" value={contentState} name="content" onChange={changeHandler} />
            </div>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={() => submitPost.bind(props.parent)()}>Post it</button>
            </div>
        </div>
    )
}

export default Form;