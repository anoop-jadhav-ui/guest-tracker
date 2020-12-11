
export const storeToken = (data) => {
    return { type: 'auth/storeToken', data: data }
}

export const clearToken = () => {
    return { type: 'auth/clearToken' }
}

export const showBannerAction = (data) => {
    return { type: 'SHOW_BANNER', data:data }
}

export const goToPage = (currentPageName) => {
    return { type: 'GO_TO_PAGE', currentPageName:currentPageName }
}

export const setUserDetails = (data) => {
    return { type : 'SET_USER_DETAILS', data : data }
}