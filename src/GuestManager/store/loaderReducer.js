let initialState = {
    showLoader: false,
}

// Sign up failed. Incorrect Username or Password.
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_LOADER':
            return {
                showLoader: action.data,
            }
        default:
            return state
    }
}

export default reducer;