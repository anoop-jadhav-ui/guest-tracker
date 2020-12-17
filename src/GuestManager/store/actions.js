
export const storeToken = (data) => {
    return { type: 'auth/storeToken', data: data }
}

export const clearToken = () => {
    return { type: 'auth/clearToken' }
}

export const showBannerAction = (data) => {
    return { type: 'SHOW_BANNER', data: data }
}

export const goToPage = (currentPageName) => {
    return { type: 'GO_TO_PAGE', currentPageName: currentPageName }
}

export const setUserDetails = (data) => {
    return { type: 'SET_USER_DETAILS', data: data }
}


export const showLoader = (data) => {
    return { type: 'SHOW_LOADER', data: data }
}

export const setSelectedEvent = (data) => {
    return {
        type: 'SET_SELECTED_EVENT',
        data: data
    }
}

export const setSelectedEventIndex = (data) => {
    return {
        type: 'SET_SELECTED_EVENT_INDEX',
        data: data
    }
}


export const setCurrentSection = (data) => {
    return {
        type: 'SET_CURRENT_SECTION',
        data: data
    }
}

export const setEvents = (data) => {
    return {
        type: 'SET_EVENTS',
        data: data
    }
}
export const setAllGuestsAction = (data) => {
    return {
        type: 'SET_ALL_GUESTS',
        data: data
    }
}
export const setSelectedGuest = (data) => {
    return {
        type: 'SET_SELECTED_GUEST',
        data: data
    }
}

export const setUserNodeId = (data) => {
    return {
        type: 'SET_USERNODE_ID',
        data: data
    }
}

export const userLogout = (data) =>{
    return {
        type : 'USER_LOGOUT'
    }
}

