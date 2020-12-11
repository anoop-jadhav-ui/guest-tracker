
import styles from './HomePage.module.css'

import Page from '../Components/Page/Page'
import Navigation from '../Components/Navigation/Navigation'
import PageHeader from '../Components/PageHeader/PageHeader'
import WelcomeSection from './WelcomeSection/WelcomeSection'
import ViewEventSection from './ViewEventSection/ViewEventSection'
import AddEventSection from './AddEventSection/AddEventSection'

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, useHistory, Switch } from 'react-router-dom'

import * as actions from '../store/actions'
import * as constants from '../constants'
import axiosInstance from '../axios'

const HomePage = (props) => {
    let firstName = '';
    if (props.displayName)
        firstName = props.displayName.split(' ')[0];

    let routeHistory = useHistory();
    let [currentSection, SetCurrentSection] = useState('welcome');
    let [selectedEvent, setSelectedEvent] = useState();
    let [pageHeader, setPageHeader] = useState();
    let [pageSubHeader, setPageSubHeader] = useState();

    // let sectionStepMap = [
    //     {
    //         step: 1,
    //         pageName: 'welcome'
    //     },
    //     {
    //         step: 2,
    //         pageName: 'viewevent'
    //     },
    //     {
    //         step: 3,
    //         pageName: 'addevent'
    //     },
    //     {
    //         step: 4,
    //         pageName: 'addguest'
    //     },
    //     {
    //         step: 5,
    //         pageName: 'viewallguests'
    //     }
    // ]

    let [events, setEvents] = useState();

    function convertObjectToArray(obj) {
        try {
            let arr = [];
            Object.keys(obj).forEach(key => {
                arr.push(obj[key]);
            });
            return arr;
        } catch (e) {
            console.log(e);
        }
    }

    function convertEventObjectToArray(obj) {
        try {
            let events = [];
            Object.keys(obj).forEach(key => {
                //events for current user
                let guests = convertObjectToArray(obj[key]['guests']);
                let currentObj = {
                    ...obj[key],
                    'guests': [...guests]
                }
                events.push(currentObj);
            });

            return events;
        } catch (e) {
            console.log(e);
        }
    }

    //Functions
    useEffect(() => {
        props.goToPage(constants.HOME_PAGE);
        //Get all events data
        axiosInstance.get('/users.json?auth=' + props.idToken)
            .then((res) => {
                Object.keys(res.data).forEach(key => {
                    let currentObj = res.data[key];
                    if (currentObj.userName === props.loggedInUserName) {
                        //events for current user
                        setEvents(convertEventObjectToArray(res.data[key].events));
                        goToSection('welcome');

                    }
                });
            }).catch((err) => {
                //redirect to auth page as the user seems to be logged out.
                console.log(err);
            })

        // let payload = {
        //     type : 'organiser',
        //     userId : 'akshayj08@gmail.com'
        // }
        // axiosInstance.post('/users.json?auth=' + props.idToken, payload)
        //     .then((res) => {
        //         console.log(res.data);
        //     }).catch((err) => {

        //         //redirect to auth page as the user seems to be logged out.
        //         console.log(err);
        //     })

    }, [])

    function goToSection(section) {
        try {
            SetCurrentSection(section);
            routeHistory.push(props.match.path + '/' + section)
        } catch (e) {
            console.log(e);
        }
    }
    function onGoBack(){
        try{
            console.log(currentSection);
            if(currentSection === 'addevent' || currentSection === 'viewevent'){
                goToSection('welcome')
                console.log(currentSection);
            }
        }catch(e){
            console.log(e);
        }
    }
    function cardClickHandler(eventId) {
        try {
            events.forEach(ele => {
                if (ele.eventId === parseInt(eventId)) {
                    setSelectedEvent(ele);
                }
            })
            goToSection('viewevent');

        } catch (e) {
            console.log(e);
        }
    }

    function createNewEventHandler(evt) {
        try {
            goToSection('addevent');
        } catch (e) {
            console.log(e);
        }
    }

    function getHeader() {
        if (currentSection === 'welcome') {
            setPageHeader(`Welcome ${firstName},`)
            setPageSubHeader("Create, Update or Add new members to the events listed below.")
        } else if (currentSection === 'viewevent') {
            setPageHeader(selectedEvent.eventName)
            setPageSubHeader("")
        }else if(currentSection === 'addevent'){
            setPageHeader("Create Event")
            setPageSubHeader("Fill the following form to create a new event. After the event is created you can add guests.")
        }
    }

    useEffect(() => {
        getHeader()
    }, [currentSection])

    return (
        <Page
            navigation={
                <Navigation showBackButton={currentSection!=='welcome'} showLogoutButton={props.currentPage === 1 || props.currentPage === 2} onGoBack={onGoBack}></Navigation>
            }
            header={
                <PageHeader header={
                    pageHeader
                } subHeader={
                    pageSubHeader
                }></PageHeader>
            }
            body={
                //Nested Route ---
                // welcome section
                //Create Event section
                //View Event
                //Guest List 
                //Add Guests
                <React.Fragment>
                    {/* <Switch> */}
                    <Route exact path={props.match.path + '/welcome'} render={
                        () => <WelcomeSection events={events} cardClickHandler={cardClickHandler} createNewEventHandler={createNewEventHandler}></WelcomeSection>
                    }></Route>
                    <Route exact path={props.match.path + '/viewevent'} render={
                        () => <ViewEventSection event={selectedEvent}></ViewEventSection>
                    }></Route>
                    {/* <Route exact path={props.match.path + '/addevent'} render={
                        () => <AddEventSection event={selectedEvent}></AddEventSection>
                    }></Route> */}
                    <Route exact path={props.match.path + '/welcome'} render={
                        () => <AddEventSection event={selectedEvent}></AddEventSection>
                    }></Route>
                    
                    {/* </Switch> */}
                </React.Fragment>
            }
        ></Page>
    )
}

const mapStoreToProps = (store) => {
    return {
        currentPage: store.navR.currentPage,
        currentPageName: store.navR.currentPageName,
        idToken: store.authR.idToken,
        displayName: store.userR.displayName,
        userType: store.userR.userType,
        loggedInUserName: store.userR.loggedInUserName
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        goToPage: (currentPageName) => dispatch(actions.goToPage(currentPageName)),
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);