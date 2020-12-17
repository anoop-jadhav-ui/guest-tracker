
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
import Confirmation from './NewUserConfirmation/NewUserConfirmation'

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
    let [selectedGuest, setSelectedGuest] = useState();

    let [userNodeId, setUserNodeId] = useState();

    function convertObjectToArray(obj,arrType) {
        try {
            let events = [];
            if (Array.isArray(obj)) {
                if(arrType === "guestsArr"){
                    let tempArr = [];
                    obj.forEach((ele,index)=>{
                        if(ele != null ){
                            tempArr.push({
                                guestId : ele.guestId,
                                nodeId : index
                            })
                        }
                    })
                    obj = [...tempArr];
                }
                return obj;
            } else {
                Object.keys(obj).forEach(key => {
                    //events for current user
                    let currentObj;
                    if ("guests" in obj[key] && obj[key]['guests'] !== undefined) {
                        let guests = convertObjectToArray(obj[key]['guests'],'guestsArr');
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
            props.showLoader(true);
            //Get all events data
            axiosInstance.get('/users.json?auth=' + props.idToken)
                .then((res) => {
                    // let newUser = true;
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
                                
                            }else{
                                setEvents([]);
                            }

                            if ("allGuests" in res.data[key] && res.data[key]['allGuests'] !== undefined) {
                                setAllGuests(convertObjectToArray(res.data[key].allGuests))
                            }else{
                                setAllGuests([])
                            }
                        }
                    });

                    if (!redirectedFromPage) {
                        goToSection('welcome');
                    }

                    props.showLoader(false);
                }).catch((err) => {
                    props.showLoader(false);
                    logoutHandler();
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

    function editGuestDetails(element) {
        try {
            setSelectedGuest(element);
            goToSection('editguest')
        } catch (e) {
            console.log(e);
        }
    }
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
            if (currentSection === 'addevent' || currentSection === 'viewevent') {
                goToSection('welcome')
            } else if (currentSection === 'newguestconfirm' || currentSection === 'eventguests') {
                goToSection('viewevent')
            } else if (currentSection === 'allguests' || currentSection === 'newguest') {
                goToSection('newguestconfirm')
            } else if (currentSection === 'editguest') {
                goToSection('eventguests')
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
                setPageSubHeader("Select guests whom you want to add to the " + selectedEvent.eventName + " event.");
                break;
            case 'newguestconfirm':
                setPageHeader("Add New Guest")
                setPageSubHeader("Do you want to add guests from exisiting list ?");
                break;
            case 'eventguests':
                setPageHeader(selectedEvent.eventName + " Guest List")
                setPageSubHeader('You can update or delete the guests in this event.');
                break;
            case 'editguest':
                setPageHeader("Edit Guest Details")
                setPageSubHeader('Please edit and save the changes.');
                break;
            default: break;

        }
    }

    function logoutHandler() {
        try {
            //clear token & userid
            props.clearToken();
        
            props.showHideBanner({ show: true, type: 'warning', text: 'Session ended. Redirecting...' })
            setTimeout(() => {
                props.showHideBanner({ show: false, type: '', text: '' })
                routeHistory.push('/');
            }, constants.BANNER_TIME);
           
        } catch (e) {
            console.log(e);
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
                <Navigation showBackButton={currentSection !== 'welcome'} showLogoutButton={props.currentPage === 1 || props.currentPage === 2} onGoBack={onGoBack} logoutHandler={logoutHandler}></Navigation>
            }
            header={
                <PageHeader header={
                    pageHeader
                } subHeader={
                    pageSubHeader
                }></PageHeader>
            }
            currentSection={currentSection}
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
                        () => <WelcomeSection
                            events={events}
                            cardClickHandler={cardClickHandler}
                            createNewEventHandler={createNewEventHandler}
                            showLoader={props.showLoader}
                        ></WelcomeSection>
                    }></Route>
                    <Route exact path={props.match.path + '/viewevent'} render={
                        () => <ViewEventSection
                            userNodeId={userNodeId}
                            idToken={props.idToken}
                            event={selectedEvent}
                            goToSection={goToSection}
                            fetchEventsData={fetchEventsData}
                            showHideBanner={props.showHideBanner}
                            showLoader={props.showLoader}
                        ></ViewEventSection>
                    }></Route>
                    <Route exact path={props.match.path + '/addevent'} render={
                        () => <AddEventSection
                            fetchEventsData={fetchEventsData}
                            userNodeId={userNodeId}
                            loggedInUserName={props.loggedInUserName}
                            event={selectedEvent}
                            events={events}
                            idToken={props.idToken}
                            showHideBanner={props.showHideBanner}
                            goToSection={goToSection}
                            showLoader={props.showLoader}
                            ></AddEventSection>
                    }></Route>
                    <Route exact path={props.match.path + '/eventguests'} render={
                        () => <GuestListSection
                            type="eventguests"
                            fetchEventsData={fetchEventsData}
                            event={selectedEvent}
                            allGuests={allGuests}
                            placeholder="Search for guests"
                            userNodeId={userNodeId}
                            idToken={props.idToken}
                            goToSection={goToSection}
                            showHideBanner={props.showHideBanner}
                            editGuestDetails={editGuestDetails}
                            showLoader={props.showLoader}></GuestListSection>
                    }></Route>
                    <Route exact path={props.match.path + '/newguest'} render={
                        () => <AddNewGuestSection
                            allGuests={allGuests}
                            fetchEventsData={fetchEventsData}
                            event={selectedEvent}
                            userNodeId={userNodeId}
                            loggedInUserName={props.loggedInUserName}
                            idToken={props.idToken}
                            goToSection={goToSection}
                            showHideBanner={props.showHideBanner}
                            showLoader={props.showLoader}
                            ></AddNewGuestSection>
                    }></Route>
                    <Route exact path={props.match.path + '/newguestconfirm'} render={
                        () => <Confirmation
                            goToSection={goToSection}
                        ></Confirmation>
                    }></Route>
                    <Route exact path={props.match.path + '/allguests'} render={
                        () => <GuestListSection
                            type="allguests"
                            allGuests={allGuests}
                            placeholder="Search for guests from other events"
                            event={selectedEvent}
                            idToken={props.idToken}
                            showHideBanner={props.showHideBanner}
                            fetchEventsData={fetchEventsData}
                            userNodeId={userNodeId}
                            goToSection={goToSection}
                            showLoader={props.showLoader}
                        ></GuestListSection>
                    }></Route>
                    <Route exact path={props.match.path + '/editguest'} render={
                        () => <AddNewGuestSection
                            allGuests={allGuests}
                            selectedGuest={selectedGuest}
                            fetchEventsData={fetchEventsData}
                            event={selectedEvent}
                            userNodeId={userNodeId}
                            loggedInUserName={props.loggedInUserName}
                            idToken={props.idToken}
                            goToSection={goToSection}
                            showHideBanner={props.showHideBanner}
                            showLoader={props.showLoader}
                        ></AddNewGuestSection>
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
        showLoader : (data) => dispatch(actions.showLoader(data)),
        clearToken: () => dispatch(actions.clearToken())
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);