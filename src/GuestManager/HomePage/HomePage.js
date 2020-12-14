
import styles from './HomePage.module.css'

import Page from '../Components/Page/Page'
import Navigation from '../Components/Navigation/Navigation'
import PageHeader from '../Components/PageHeader/PageHeader'
import WelcomeSection from './WelcomeSection/WelcomeSection'
import ViewEventSection from './ViewEventSection/ViewEventSection'
import AddEventSection from './AddEventSection/AddEventSection'
import GuestListSection from './GuestListSection/GuestListSection'
import AddNewGuestSection from './AddNewGuestSection/AddNewGuestSection'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, useHistory, Switch } from 'react-router-dom'

import * as actions from '../store/actions'
import * as constants from '../constants'
import axiosInstance from '../axios'

import { getId } from '../Iterators'

const HomePage = (props) => {
    let firstName = '';
    if (props.displayName)
        firstName = props.displayName.split(' ')[0];

    let routeHistory = useHistory();


    let [currentSection, SetCurrentSection] = useState('welcome');
    let [selectedEvent, setSelectedEvent] = useState();
    let [pageHeader, setPageHeader] = useState();
    let [pageSubHeader, setPageSubHeader] = useState();
    let [events, setEvents] = useState();
    let [allGuests, setAllGuests] = useState();

    let [userNodeId, setUserNodeId] = useState();

    function convertObjectToArray(obj) {
        try {
            let events = [];
            console.log(Array.isArray(obj))
            if (Array.isArray(obj)) {
                return obj;
            } else {
                Object.keys(obj).forEach(key => {
                    //events for current user
                    let currentObj;
                    if ("guests" in obj[key] && obj[key]['guests'] != undefined) {
                        let guests = convertObjectToArray(obj[key]['guests']);

                        currentObj = {
                            ...obj[key],
                            'guests': [...guests]
                        }
                    } else {
                        currentObj = {
                            ...obj[key],
                        }
                    }

                    currentObj.nodeId = key;

                    events.push(currentObj);
                });

                return events;
            }

        } catch (e) {
            console.log(e);
        }
    }

    function fetchEventsData(redirectedFromPage) {
        try {
            //Get all events data
            axiosInstance.get('/users.json?auth=' + props.idToken)
                .then((res) => {
                    let newUser = true;
                    Object.keys(res.data).forEach(key => {
                        let currentObj = res.data[key];
                        if (currentObj.userName === props.loggedInUserName) {
                            //events for current user
                            setUserNodeId(key);
                            if ('events' in res.data[key]) {
                                let eventsArr = convertObjectToArray(res.data[key].events);
                                eventsArr = eventsArr.sort((a, b) => {
                                    if (new Date(a.eventDate) < new Date(b.eventDate)) {
                                        return 1;
                                    } else {
                                        return -1
                                    }
                                })
                                setEvents(eventsArr);
                                if ("allGuests" in res.data[key] && res.data[key]['allGuests'] != undefined) {
                                    setAllGuests(convertObjectToArray(res.data[key].allGuests))
                                }

                            }
                            newUser = false;
                        }
                    });

                    if (newUser) {
                        let payload = {
                            userName: props.loggedInUserName,
                            userId: getId.next().value,
                            displayName: props.displayName
                        }
                        axiosInstance.post(`/users.json?auth=` + props.idToken, payload)
                            .then((res) => {
                                props.showHideBanner({ show: true, type: 'success', text: "User Record Created Successfully." })
                                setTimeout(() => {
                                    props.showHideBanner({ show: false, type: '', text: '' })
                                }, constants.BANNER_TIME);
                            }).catch((err) => {
                                props.showHideBanner({ show: true, type: 'failed', text: "Sorry Coun't create user record. Please login again and try." })
                                setTimeout(() => {
                                    props.showHideBanner({ show: false, type: '', text: '' })
                                }, constants.BANNER_TIME);
                            })
                    }


                    if (redirectedFromPage !== 'newguest') {
                        goToSection('welcome');
                    }



                }).catch((err) => {
                    //redirect to auth page as the user seems to be logged out.
                    console.log(err);
                })

        } catch (e) {
            console.log(e);
        }
    }
    //Functions
    useEffect(() => {
        props.goToPage(constants.HOME_PAGE);
        fetchEventsData();
    }, [])

    useEffect(() => {
        //updated selected event view 
        if (selectedEvent) {
            let currentSelectedEventId = selectedEvent.eventId;
            events.forEach(ele => {
                if (ele.eventId === currentSelectedEventId) {
                    setSelectedEvent(ele);
                }
            })
        }

    }, [events])

    function goToSection(section) {
        try {
            SetCurrentSection(section);
            routeHistory.push(props.match.path + '/' + section)
        } catch (e) {
            console.log(e);
        }
    }
    function onGoBack() {
        try {
            console.log(currentSection);
            if (currentSection === 'addevent' || currentSection === 'viewevent') {
                goToSection('welcome')
            } else if (currentSection === 'allguests' || currentSection === 'newguest') {
                goToSection('viewevent')
            }
        } catch (e) {
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
        switch (currentSection) {
            case 'welcome':
                setPageHeader(`Welcome ${firstName},`)
                setPageSubHeader("Create, Update or Add new members to the events listed below.");
                break;
            case 'viewevent':
                setPageHeader(selectedEvent.eventName)
                setPageSubHeader("")
                break;
            case 'addevent':
                setPageHeader("Create Event")
                setPageSubHeader("Fill the following form to create a new event. After the event is created you can add guests.")
                break;
            case 'newguest':
                setPageHeader("Add New Guest")
                setPageSubHeader("Fill the following form to create a new guest for the selected event.");
                break;
            case 'allguests':
                setPageHeader("All Guests")
                setPageSubHeader("Following is the total list of guests coming in all your events.");
            default: break;

        }
    }

    useEffect(() => {
        getHeader()
        if (currentSection === 'welcome') {
            fetchEventsData();
        }
    }, [currentSection])

    return (
        <Page
            navigation={
                <Navigation showBackButton={currentSection !== 'welcome'} showLogoutButton={props.currentPage === 1 || props.currentPage === 2} onGoBack={onGoBack}></Navigation>
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
                        () => <ViewEventSection event={selectedEvent} goToSection={goToSection}></ViewEventSection>
                    }></Route>
                    <Route exact path={props.match.path + '/addevent'} render={
                        () => <AddEventSection userNodeId={userNodeId} loggedInUserName={props.loggedInUserName} event={selectedEvent} events={events} idToken={props.idToken} showHideBanner={props.showHideBanner} goToSection={goToSection}></AddEventSection>
                    }></Route>
                    <Route exact path={props.match.path + '/allguests'} render={
                        () => <GuestListSection allGuests={allGuests} placeholder="Search for guests from other events"></GuestListSection>
                    }></Route>
                    <Route exact path={props.match.path + '/newguest'} render={
                        () => <AddNewGuestSection fetchEventsData={fetchEventsData} event={selectedEvent} userNodeId={userNodeId} loggedInUserName={props.loggedInUserName} idToken={props.idToken} goToSection={goToSection} showHideBanner={props.showHideBanner}></AddNewGuestSection>
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
        showHideBanner: (data) => dispatch(actions.showBannerAction(data)),
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);