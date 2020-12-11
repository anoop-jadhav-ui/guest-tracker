let initialState = {
    displayName: '',
    userType: '',
    loggedInUserName:''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                displayName: action.data.displayName,
                userType: action.data.userType,
                loggedInUserName:action.data.loggedInUserName
            }
        default:
            return state
    }
}

export default reducer;