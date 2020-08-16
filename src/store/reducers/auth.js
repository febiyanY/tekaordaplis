import * as types from '../actions/actionTypes'

let initialState = {
    token: null,
    userId: null,
    error: null
}

const reducer = (state = initialState, action) => {
    let authData = null
    switch (action.type) {
        // case types.AUTH_START:
        //     console.log({authData : action.authData})
        //     return state
        case types.AUTH_SUCCESS:
            authData = action.authData.data
            return {
                ...state,
                token: authData.idToken,
                userId: authData.localId,
                error: null
            }
        case types.AUTH_FAIL:
            authData = action.error.data
            return {
                ...state,
                error: authData.error.message
            }
        case types.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                error : null
            }
        default:
            return state
    }
}

export default reducer