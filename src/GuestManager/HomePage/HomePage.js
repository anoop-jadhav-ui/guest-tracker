import Page from '../Components/Page/Page'
import Navigation from '../Components/Navigation/Navigation'
import PageHeader from '../Components/PageHeader/PageHeader'
import WelcomeSection from './WelcomeSection/WelcomeSection'
import ViewEventSection from './ViewEventSection/ViewEventSection'
import AddEventSection from './AddEventSection/AddEventSection'
import GuestListSection from './GuestListSection/GuestListSection'
import AddNewGuestSection from './AddNewGuestSection/AddNewGuestSection'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

import * as actions from '../store/actions'
import * as constants from '../constants'
import axiosInstance from '../axios'

import Confirmation from './NewUserConfirmation/NewUserConfirmation'

const HomePage = (props) => {
    let firstName = '';
    if (props.displayName)
        firstName = props.displayName.split(' ')[0];

    let routeHistory = useHistory();

    function convertObjectToArray(obj, arrType) {
        try {
            let events = [];
            if (Array.isArray(obj)) {
                if (arrType === "guestsArr") {
                    let tempArr = [];
                    obj.forEach((ele, index) => {
                        if (ele != null) {
                            tempArr.push({
                                guestId: ele.guestId,
                                nodeId: index
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
                        let guests = convertObjectToArray(obj[key]['guests'], 'guestsArr');
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
                        if (currentObj.userName.toLowerCase() === props.loggedInUserName.toLowerCase()) {
                            //events for current user
                            props.setUserNodeId(key);
                            if ('events' in res.data[key]) {
                                let eventsArr = convertObjectToArray(res.data[key].events);
                                eventsArr = eventsArr.sort((a, b) => {
                                    if (new Date(a.eventDate) < new Date(b.eventDate)) {
                                        return 1;
                                    } else {
                                        return -1
                                    }
                                })
                                props.setEvents(eventsArr);

                            } else {
                                props.setEvents([]);
                            }

                            if ("allGuests" in res.data[key] && res.data[key]['allGuests'] !== undefined) {
                                props.setAllGuests(convertObjectToArray(res.data[key].allGuests))
                            } else {
                                props.setAllGuests([])
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
    // useEffect(() => {
    //     props.goToPage(constants.HOME_PAGE);
    //     fetchEventsData();
    // }, [])

    useEffect(() => {
        //updated selected event view 
        if (props.selectedEvent) {
            let currentSelectedEventId = props.selectedEvent.eventId;
            props.events.forEach(ele => {
                if (ele.eventId === currentSelectedEventId) {
                    props.setSelectedEvent(ele);
                }
            })
        }

    }, [props.events])

    function editGuestDetails(element) {
        try {
            props.setSelectedGuest(element);
            goToSection('editguest')
        } catch (e) {
            console.log(e);
        }
    }
    function goToSection(section) {
        try {
            props.setCurrentSection(section);
            routeHistory.push(props.match.path + '/' + section)
        } catch (e) {
            console.log(e);
        }
    }
    function onGoBack() {
        try {
            if (props.currentSection === 'addevent' || props.currentSection === 'viewevent') {
                goToSection('welcome')
            } else if (props.currentSection === 'newguestconfirm' || props.currentSection === 'eventguests') {
                goToSection('viewevent')
            } else if (props.currentSection === 'allguests' || props.currentSection === 'newguest') {
                goToSection('newguestconfirm')
            } else if (props.currentSection === 'editguest') {
                goToSection('eventguests')
            }
        } catch (e) {
            console.log(e);
        }
    }
    function cardClickHandler(eventId,index) {
        try {
            props.events.forEach(ele => {
                if (ele.eventId === parseInt(eventId)) {
                    props.setSelectedEvent(ele);
                    props.setSelectedEventIndex(index);
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

    console.log(props);

    useEffect(() => {
       props.setCurrentSection('welcome');
    }, [])

    useEffect(() => {
        // getHeader()
        if (props.currentSection === 'welcome') {
            fetchEventsData();
        }
    }, [props.currentSection])

    return (
        <Page
            navigation={
                <Navigation showBackButton={props.currentSection !== 'welcome'} showLogoutButton={props.currentPage === 1 || props.currentPage === 2} onGoBack={onGoBack} logoutHandler={logoutHandler}></Navigation>
            }
            header={
                <PageHeader header={
                    // pageHeader
                    <React.Fragment>
                        <Route exact path={props.match.path + '/welcome'} render={() => {
                            return `Welcome ${firstName},`;
                        }}></Route>
                        <Route exact path={props.match.path + '/viewevent'} render={() => {
                            return props.selectedEvent.eventName;
                        }}></Route>
                        <Route exact path={props.match.path + '/addevent'} render={() => {
                            return "Create Event";
                        }}></Route>
                        <Route exact path={props.match.path + '/eventguests'} render={() => {
                            return props.selectedEvent.eventName + " Guest List";
                        }}></Route>
                        <Route exact path={props.match.path + '/newguest'} render={() => {
                            return "Add New Guest";
                        }}></Route>
                        <Route exact path={props.match.path + '/newguestconfirm'} render={() => {
                            return "Add New Guest";
                        }}></Route>
                        <Route exact path={props.match.path + '/allguests'} render={() => {
                            return "All Guests";
                        }}></Route>
                        <Route exact path={props.match.path + '/editguest'} render={() => {
                            return "Edit Guest Details";
                        }}></Route>
                    </React.Fragment>
                } subHeader={
                    <React.Fragment>
                        <Route exact path={props.match.path + '/welcome'} render={() => {
                            return "Create, Update or Add new members to the events listed below.";
                        }}></Route>
                        <Route exact path={props.match.path + '/viewevent'} render={() => {
                            return "";
                        }}></Route>
                        <Route exact path={props.match.path + '/addevent'} render={() => {
                            return "Fill the following form to create a new event. After the event is created you can add guests.";
                        }}></Route>
                        <Route exact path={props.match.path + '/eventguests'} render={() => {
                            return "You can update or delete the guests in this event.";
                        }}></Route>
                        <Route exact path={props.match.path + '/newguest'} render={() => {
                            return "Fill the following form to create a new guest for the selected event.";
                        }}></Route>
                        <Route exact path={props.match.path + '/newguestconfirm'} render={() => {
                            return "Do you want to add guests from exisiting list ?";
                        }}></Route>
                        <Route exact path={props.match.path + '/allguests'} render={() => {
                            return "Select guests whom you want to add to the " + props.selectedEvent.eventName + " event.";
                        }}></Route>
                        <Route exact path={props.match.path + '/editguest'} render={() => {
                            return "Please edit and save the changes.";
                        }}></Route>
                    </React.Fragment>
                }></PageHeader>
            }
            currentSection={props.currentSection}
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
                            events={props.events}
                            cardClickHandler={cardClickHandler}
                            createNewEventHandler={createNewEventHandler}
                            showLoader={props.showLoader}
                        ></WelcomeSection>
                    }></Route>
                    <Route exact path={props.match.path + '/viewevent'} render={
                        () => <ViewEventSection
                            userNodeId={props.userNodeId}
                            idToken={props.idToken}
                            event={props.selectedEvent}
                            goToSection={goToSection}
                            fetchEventsData={fetchEventsData}
                            showHideBanner={props.showHideBanner}
                            showLoader={props.showLoader}
                            selectedEventIndex={props.selectedEventIndex}
                        ></ViewEventSection>
                    }></Route>
                    <Route exact path={props.match.path + '/addevent'} render={
                        () => <AddEventSection
                            fetchEventsData={fetchEventsData}
                            userNodeId={props.userNodeId}
                            loggedInUserName={props.loggedInUserName}
                            event={props.selectedEvent}
                            events={props.events}
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
                            event={props.selectedEvent}
                            allGuests={props.allGuests}
                            placeholder="Search for guests"
                            userNodeId={props.userNodeId}
                            idToken={props.idToken}
                            goToSection={goToSection}
                            showHideBanner={props.showHideBanner}
                            editGuestDetails={editGuestDetails}
                            showLoader={props.showLoader}></GuestListSection>
                    }></Route>
                    <Route exact path={props.match.path + '/newguest'} render={
                        () => <AddNewGuestSection
                            allGuests={props.allGuests}
                            fetchEventsData={fetchEventsData}
                            event={props.selectedEvent}
                            userNodeId={props.userNodeId}
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
                            allGuests={props.allGuests}
                            placeholder="Search for guests from other events"
                            event={props.selectedEvent}
                            idToken={props.idToken}
                            showHideBanner={props.showHideBanner}
                            fetchEventsData={fetchEventsData}
                            userNodeId={props.userNodeId}
                            goToSection={goToSection}
                            showLoader={props.showLoader}
                        ></GuestListSection>
                    }></Route>
                    <Route exact path={props.match.path + '/editguest'} render={
                        () => <AddNewGuestSection
                            allGuests={props.allGuests}
                            selectedGuest={props.selectedGuest}
                            fetchEventsData={fetchEventsData}
                            event={props.selectedEvent}
                            userNodeId={props.userNodeId}
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
        loggedInUserName: store.userR.loggedInUserName,
        selectedEvent : store.homeR.selectedEvent,
        selectedEventIndex:store.homeR.selectedEventIndex,
        currentSection:store.homeR.currentSection,
        events:store.homeR.events,
        allGuests:store.homeR.allGuests,
        selectedGuest:store.homeR.selectedGuest,
        userNodeId:store.homeR.userNodeId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        goToPage: (currentPageName) => dispatch(actions.goToPage(currentPageName)),
        showHideBanner: (data) => dispatch(actions.showBannerAction(data)),
        showLoader: (data) => dispatch(actions.showLoader(data)),
        clearToken: () => dispatch(actions.clearToken()),
        setSelectedEvent : (data) => dispatch(actions.setSelectedEvent(data)),
        setSelectedEventIndex : (data) => dispatch(actions.setSelectedEventIndex(data)),
        setCurrentSection : (data) => dispatch(actions.setCurrentSection(data)),
        setEvents : (data) => dispatch(actions.setEvents(data)),
        setAllGuests : (data) => dispatch(actions.setAllGuestsAction(data)),
        setSelectedGuest : (data) => dispatch(actions.setSelectedGuest(data)),
        setUserNodeId : (data) => dispatch(actions.setUserNodeId(data)),
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(HomePage);