import { useState, useRef, useEffect } from 'react'
import styles from './Auth.module.css'
import * as constants from '../constants'
import Input from '../Components/Input/Input'
import axios from 'axios'
import Banner from '../Components/Banner/Banner'
const Auth = (props) => {

    //STATES
    let [authType, setAuthType] = useState('Register');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [signUpas, setSignUpas] = useState('Organiser');
    let [options, setOptions] = useState([{
        id: 0,
        label: 'Organiser',
        value: 'Ograniser',
        checked: true
    }, {
        id: 1,
        label: 'Guest',
        value: 'Guest',
        checked: false
    }]);
    //REFS
    let signUpAsRef = useRef();
    let usernameRef = useRef();
    let passwordRef = useRef();


    function changeHandler(evt) {
        try {
            let inputName = evt.target.name;
            let inputValue = evt.target.value;

            switch (inputName) {
                case 'username':
                    setUsername(inputValue);
                    if (inputValue !== '') {
                        usernameRef.current.removeHighlights();
                    } else {
                        usernameRef.current.highlightInput();
                    }
                    break;
                case 'password':
                    setPassword(inputValue);
                    if (inputValue !== '') {
                        passwordRef.current.removeHighlights();
                    } else {
                        passwordRef.current.highlightInput();
                    }
                    break;
                case 'signupas':
                    let optionsTemp = [...options];

                    optionsTemp.forEach(ele => {
                        if (ele.value === inputValue) {
                            ele.checked = true;
                        } else {
                            ele.checked = false;
                        }
                    })
                    setOptions(optionsTemp);
                    setSignUpas(inputValue);
                    break;
                default: break;
            }

        } catch (e) {
            console.log(e);
        }
    }
    function validateInputs() {
        try {
            let flag = true;
            if (username === '') {
                flag = false;
                usernameRef.current.highlightInput();
            } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username)) {
                flag = false;
                usernameRef.current.highlightInput('email');
            } else {
                usernameRef.current.removeHighlights();
            }

            if (password === '') {
                flag = false;
                passwordRef.current.highlightInput();
            } else {
                passwordRef.current.removeHighlights();
            }


            if (signUpas === '') {
                flag = false;
                signUpAsRef.current.highlightInput();
            } else {
                signUpAsRef.current.removeHighlights();
            }


            return flag;
        } catch (e) {
            console.log(e);
        }
    }
    function buttonHandler(evt) {
        try {

            let validated = validateInputs();
            if (validated) {
                if (authType === constants.REGISTER) {
                    //LOGIN
                    let payload = {
                        email: username,
                        password: password,
                        returnSecureToken: true
                    }

                    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, payload)
                        .then((response) => {
                            console.log(response);
                            //User registered
                        })
                        .catch((err)=>{
                            //User Already present 
                            console.log(err);
                        })

                } else if (authType === constants.LOGIN) {
                    //REGISTER
                }
            }

        } catch (e) {
            console.log(e);
        }
    }
    function registerHandler() {
        try {
            if (authType === constants.LOGIN) {
                setAuthType(constants.REGISTER)
            } else {
                setAuthType(constants.LOGIN)
            }

        } catch (e) {
            console.log(e);
        }
    }

    function forgotPasswordHandler() {

    }
    return (
        <div className={styles.AuthFormWrapper + ' greyBorder'}>
            {/* <h1 className={styles.AuthFormHeader}>
                {authHeader}
            </h1> */}
            <Banner text="User Registered!"></Banner>
            <div className={styles.inputContainer}>
                <div className="inputWrapper">
                    <Input label="Sign up as" ref={signUpAsRef} options={options} name="signupas" type="radio" value={password} onChange={changeHandler}></Input>
                </div>
                <div className="inputWrapper">
                    <Input label="Username" ref={usernameRef} name="username" type="text" value={username} onChange={changeHandler}></Input>
                </div>
                <div className="inputWrapper">
                    <Input label="Password" ref={passwordRef} name="password" type="password" value={password} onChange={changeHandler}></Input>
                </div>
                <div className={styles.buttonWrapper}>
                    <button className={styles.loginButton + " primaryButton"} onClick={buttonHandler}><span className="buttonText">{authType}</span></button>
                </div>
                <div className={styles.secButtons}>
                    <div className={styles.buttonWrapper}>
                        <button className="secondaryButton" onClick={registerHandler}><span className="buttonText">{
                            authType === constants.LOGIN ? constants.REGISTER : constants.LOGIN
                        }</span></button>
                    </div>
                    <div className={styles.buttonWrapper}>
                        <button className="secondaryButton" onClick={forgotPasswordHandler}><span className="buttonText">Forgot Password?</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;