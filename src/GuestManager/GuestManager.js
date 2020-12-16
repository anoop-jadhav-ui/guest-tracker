import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Auth from './Auth/Auth'
import Banner from './Components/Banner/Banner'
import HomePage from './HomePage/HomePage'
import Logo from './Components/Logo/Logo'
import Loader from './Components/Loader/Loader'
import styles from './GuestManager.module.css'

import './Common.css'


import firebase from "./firebaseConfig.js";
import * as actions from './store/actions'

// let dataBase = firebase.database();

const GuestManager = (props) => {
    useEffect(() => {
        // let rootRef = dataBase.ref().child("/");
        // rootRef.on("value", (snapshot) => {
        //     console.log(snapshot.val());


        //     let data = JSON.parse(JSON.stringify(snapshot.val()));

        //     console.log(data);
        // });

    }, []);

    return (
        <BrowserRouter>
            {props.showLoader && <Loader></Loader>}
            {props.showBanner && <Banner type={props.type} text={props.text}></Banner>}
            {props.currentPage === 0 && <Logo></Logo>}
            <div className={styles.AppWrapper}>
                <Switch>
                    <Route path="/" exact component={Auth}></Route>
                    <Route path="/home" component={HomePage}></Route>
                    <Route path="/error" render={() => <div>Error</div>}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStoreToProps = (store) => {
    return {
        localId: store.authR.localId,
        idToken: store.authR.idToken,
        showBanner: store.bannerR.showBanner,
        text: store.bannerR.text,
        type: store.bannerR.type,
        currentPage: store.navR.currentPage,
        showLoader : store.loadR.showLoader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeToken: (idToken, localId) => dispatch(actions.storeToken({ idToken, localId })),
        clearToken: () => dispatch(actions.clearToken()),
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(GuestManager);