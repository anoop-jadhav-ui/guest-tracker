import styles from './GuestManager.module.css'
import './Common.css'
import Auth from './Auth/Auth'
import React, { Component, useEffect } from 'react';
import firebase from "./firebaseConfig.js";

let dataBase = firebase.database();

const GuestManager = () => {

    useEffect(() => {
        // let rootRef = dataBase.ref().child("/");
        // rootRef.on("value", (snapshot) => {
        //     console.log(snapshot.val());
             

        //     let data = JSON.parse(JSON.stringify(snapshot.val()));

        //     console.log(data);
        // });

    }, []);
    return (
        <React.Fragment>
            <div className="logo"><span>Guest</span><span>Tracker</span></div>
            <div className={styles.AppWrapper}>
                <Auth></Auth>
            </div>
        </React.Fragment>
    )
}

export default GuestManager;