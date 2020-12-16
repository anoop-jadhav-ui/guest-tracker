import { useState, useRef, useEffect } from 'react'
import styles from './Auth.module.css'
import * as constants from '../constants'
import Input from '../Components/Input/Input'
import axios from 'axios'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Button from '../Components/Button/Button'
import axiosInstance from '../axios'

import { getId } from '../Iterators'

const Auth = (props) => {

    //STATES
    // let [authenticationStatus, setauthenticationStatus] = useState('');
    let [authType, setAuthType] = useState('Login');
    let [username, setUsername] = useState('');
    let [fullname, setFullname] = useState('');
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
    let fullnameRef = useRef();


    //Functions
    useEffect(() => {
        props.goToPage(constants.AUTH_PAGE);
    }, [])

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
                case 'fullname':
                    setFullname(inputValue);
                    if (inputValue !== '') {
                        fullnameRef.current.removeHighlights();
                    } else {
                        fullnameRef.current.highlightInput();
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
            } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username.trim())) {
                flag = false;
                usernameRef.current.highlightInput('');
            } else {
                usernameRef.current.removeHighlights();
            }

            if (authType === constants.REGISTER) {
                if (fullname === '') {
                    flag = false;
                    fullnameRef.current.highlightInput();
                } else {
                    fullnameRef.current.removeHighlights();
                }
            }

            if (password === '') {
                flag = false;
                passwordRef.current.highlightInput();
            } else {
                passwordRef.current.removeHighlights();
            }

            if (authType === constants.REGISTER) {
                if (signUpas === '') {
                    flag = false;
                    signUpAsRef.current.highlightInput();
                } else {
                    signUpAsRef.current.removeHighlights();
                }
            }

            return flag;
        } catch (e) {
            console.log(e);
        }
    }

    function setLoginExpireFunctionality(time) {
        try {
            let timeInSecs = parseInt(time) * 1000;
            console.log('logout time ' + time)
            setTimeout(() => {
                logout();
            }, timeInSecs);
        } catch (e) {
            console.log(e);
        }
    }

    function logout() {
        try {
            //clear token & userid
            props.clearToken();
            setTimeout(() => {
                props.showHideBanner({ show: true, type: 'warning', text: 'You are logged out. Please login again.' })
                props.history.push({ pathname: '/' });

                setTimeout(() => {
                    props.showHideBanner({ show: false, type: '', text: '' })
                }, constants.BANNER_TIME);
            }, constants.BANNER_TIME);

        } catch (e) {
            console.log(e);
        }
    }
    function RegisterUser(payload) {
        try {
            props.showLoader(true);
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, payload)
                .then((response) => {
                    props.showLoader(false);
                    //User registered
                    let payload = {
                        userName: username,
                        userId: getId.next().value,
                        displayName: fullname
                    }
                    axiosInstance.post(`/users.json?auth=` + response.data.idToken, payload)
                        .then((res) => {
                            setPassword('');
                            props.showHideBanner({ show: true, type: 'success', text: 'Sign up successful. Please Login to continue...' })
                            setTimeout(() => {
                                props.showHideBanner({ show: false, type: '', text: '' })
                                setAuthType('Login');
                            }, constants.BANNER_TIME);
                        })
                })
                .catch((err) => {
                    props.showLoader(false);
                    //User Already present 
                    console.log(err);
                    // setauthenticationStatus(constants.REGISTRATION_FAILED);
                    setPassword('');
                    props.showHideBanner({ show: true, type: 'failed', text: 'Sign up failed. Incorrect Username or Password.' })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                })

        } catch (e) {
            console.log(e);
        }
    }
    function LoginUser(payload) {
        try {
            props.showLoader(true);
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`, payload)
                .then((response) => {
                    props.showLoader(false);
                    setLoginExpireFunctionality(response.data.expiresIn);
                    props.storeToken(response.data.idToken, response.data.localId, response.data.displayName);

                    //Set User Details
                    let displayName = response.data.displayName;
                    let splitArr = displayName.split('&&');

                    props.setUserDetails({
                        userType: splitArr[1],
                        displayName: splitArr[0],
                        loggedInUserName: response.data.email
                    })
                    //User registered
                    // setauthenticationStatus(constants.AUTHENTICATION_SUCCESS);
                    setPassword('');
                    props.showHideBanner({ show: true, type: 'success', text: 'Login successful. Redirecting to homepage...' })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                        props.history.push({ pathname: '/home' });
                        props.goToPage(constants.HOME_PAGE);
                    }, constants.BANNER_TIME);
                  
                })
                .catch((err) => {
                    props.showLoader(false);
                    //User Already present 
                    // setauthenticationStatus(constants.AUTHENTICATION_FAILED);
                    setPassword('');
                    props.showHideBanner({ show: true, type: 'failed', text: 'Login Failed. Incorrect Username or Password.' })
                    setTimeout(() => {
                        props.showHideBanner({ show: false, type: '', text: '' })
                    }, constants.BANNER_TIME);
                })

        } catch (e) {
            console.log(e);
        }
    }
    function buttonHandler(evt) {
        try {

            let validated = validateInputs();
            if (validated) {
                //LOGIN
                let payload = {
                    email: username.trim(),
                    displayName: fullname + '&&' + signUpas,
                    password: password,
                    returnSecureToken: true
                }
                if (authType === constants.REGISTER) {
                    RegisterUser(payload);
                } else if (authType === constants.LOGIN) {
                    LoginUser(payload);
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
            <div className={styles.inputContainer}>
                {
                    authType === 'Register' && (<div className="inputWrapper">
                        <Input label="Sign up as" ref={signUpAsRef} options={options} name="signupas" type="radio" value={password} onChange={changeHandler}></Input>
                    </div>)
                }

                {authType === constants.REGISTER && <div className="inputWrapper">
                    <Input label="Full Name" ref={fullnameRef} name="fullname" type="text" value={fullname} onChange={changeHandler} placeholder='Georgia Young'></Input>
                </div>}
                <div className="inputWrapper">
                    <Input label="Username" ref={usernameRef} name="username" type="text" value={username} onChange={changeHandler} placeholder='georgia.young@example.com'></Input>
                </div>
                <div className="inputWrapper">
                    <Input label="Password" ref={passwordRef} name="password" type="password" value={password} onChange={changeHandler} placeholder='***********'></Input>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button type='primary' className={styles.loginButton} onClick={buttonHandler}>{authType}</Button>
                </div>
                <div className={styles.buttonWrapper + ' padding-top-1_2'}>
                    <Button type='secondary' onClick={forgotPasswordHandler}>Forgot Password?</Button>
                </div>
                <div className={styles.buttonWrapper}>
                    <Button type='secondary' className="text-align-left" onClick={registerHandler}>
                        <span className={styles.registerButton}>{
                            authType === constants.LOGIN ? <span>New User?<span className="bold color-primary"> Register here</span></span> : <span>Already have an Account?<span className="bold color-primary"> Login here</span></span>
                        }</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const mapStoreToProps = (store) => {
    return {
        currentPage: store.navR.currentPage,
        currentPageName: store.navR.currentPageName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeToken: (idToken, localId, displayName) => dispatch(actions.storeToken({ idToken, localId, displayName })),
        clearToken: () => dispatch(actions.clearToken()),
        showHideBanner: (data) => dispatch(actions.showBannerAction(data)),
        goToPage: (currentPageName) => dispatch(actions.goToPage(currentPageName)),
        setUserDetails: (data) => dispatch(actions.setUserDetails(data)),
        showLoader : (data) => dispatch(actions.showLoader(data))
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(Auth);