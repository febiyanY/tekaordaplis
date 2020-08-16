import * as type from './actionTypes'
import axios from 'axios'

export const authStart = (data, mode) => {
    return dispatch => {
        dispatch({ type: type.SHOW_LOADER })
        data = { ...data, returnSecureToken: true }
        let url = mode === 'signup' ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}` : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
        axios.post(url, data).then(res => {
            dispatch(authSuccess(res))
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('userId', res.data.localId)
            const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('expDate', expDate)
            dispatch({ type: type.HIDE_LOADER })
            dispatch(checkAuthTimeout(res.data.expiresIn))
        }).catch(err => {
            dispatch({ type: type.AUTH_FAIL, error: err.response })
            dispatch({ type: type.HIDE_LOADER })
        })
    }
}

export const authSuccess = (authData) => {
    return {
        type: type.AUTH_SUCCESS,
        authData
    }
}
export const authFail = (error) => {
    return {
        type: type.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')
    localStorage.removeItem('userId')
    return {
        type: type.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expTime * 1000)
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expDate = new Date(localStorage.getItem('expDate'))
            const remainingTime = (expDate - new Date())/1000
            if (expDate < new Date()) {
                dispatch(logout())
            } else {
                const localId = localStorage.getItem('userId')
                const authData = {
                    data: {
                        idToken: token,
                        localId
                    }
                }
                dispatch(authSuccess(authData))
                dispatch(checkAuthTimeout(remainingTime))
            }
        }
    }
}