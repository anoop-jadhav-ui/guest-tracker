let initialState = {
    showBanner: false,
    text: '',
    type: ''
}

// Sign up failed. Incorrect Username or Password.
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_BANNER':
            return {
                showBanner: action.data.show,
                text: action.data.text,
                type: action.data.type
            }
        default:
            return state
    }
}

export default reducer;