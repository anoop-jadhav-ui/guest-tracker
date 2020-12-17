let initialState = {
    selectedEvent: null ,
    selectedEventIndex: 0,
    currentSection: 'welcome',
    events: null,
    allGuests: null,
    selectedGuest: null,
    userNodeId: ''
}

// Sign up failed. Incorrect Username or Password.
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SELECTED_EVENT':
            return {
                ...state,
                selectedEvent: action.data
            }
        case 'SET_SELECTED_EVENT_INDEX':
            return {
                ...state,
                selectedEventIndex: action.data
            }
        case 'SET_CURRENT_SECTION':
            return {
                ...state,
                currentSection: action.data
            }
        case 'SET_EVENTS':
            return {
                ...state,
                events: action.data
            }
        case 'SET_ALL_GUESTS':
            return {
                ...state,
                allGuests: action.data
            }
        case 'SET_SELECTED_GUEST':
            return {
                ...state,
                selectedGuest: action.data
            }
        case 'SET_USERNODE_ID':
            return {
                ...state,
                userNodeId: action.data
            }
        default:
            return state
    }
}

export default reducer;


