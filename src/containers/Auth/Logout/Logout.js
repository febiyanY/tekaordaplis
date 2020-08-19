import React, {useEffect, useCallback} from 'react'
import {Redirect} from 'react-router-dom'
// import {AuthContext} from '../../../contexts/auth'
import * as actionType from '../../../store/actions/auth'
import {useDispatch, useSelector} from 'react-redux'

const Logout = props => {
    // const {authState, logout, authDispatch} = useContext(AuthContext)
    const dispatch = useDispatch()
    const onLogout = useCallback(() => dispatch(actionType.logout()),[dispatch])
    const isAuth = useSelector(state => state.auth.token)

    let redirect = null
    
    useEffect(() => {
        onLogout()
    },[onLogout])

    if(isAuth){
        redirect = <Redirect to="/" />
    }

    return redirect
}

export default Logout