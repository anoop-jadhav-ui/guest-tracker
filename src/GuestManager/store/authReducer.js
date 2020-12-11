let initialState = {
    localId: '',
    idToken: ''
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'auth/storeToken':
            console.log(action);
            return {
                localId: action.data.localId,
                idToken: action.data.idToken,
            }
        case 'auth/clearToken':
            return {
                localId: '',
                idToken: '',
            }
        default:
            return state
    }
}

export default reducer;