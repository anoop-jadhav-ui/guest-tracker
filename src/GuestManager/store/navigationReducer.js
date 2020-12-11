import * as constants from '../constants'

let pageNameMap = [
    {
        name: constants.AUTH_PAGE,
        step: 0
    },
    {
        name: constants.HOME_PAGE,
        step: 1
    },
    {
        name: constants.EVENT_PAGE,
        step: 2
    },
    {
        name: constants.GUEST_LIST_PAGE,
        step: 3
    }
]

let initialState = {
    currentPage: 0,
    currentPageName: constants.AUTH_PAGE
}

// Sign up failed. Incorrect Username or Password.
function reducer(state = initialState, action) {

    let step;
    let pageName;
    
    pageNameMap.forEach((ele) => {
        if (ele.name === action.currentPageName) {
            step = ele.step;
            pageName = ele.name;
        }
    })

    switch (action.type) {
        case 'GO_TO_PAGE':
            return {
                currentPage: step,
                currentPageName: pageName
            }
        default:
            return state
    }
}

export default reducer;