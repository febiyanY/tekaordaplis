import React from 'react'
import { Redirect } from 'react-router-dom'
import {useSelector} from 'react-redux'

const NotFound = props => {

    const token = useSelector(state => state.auth.token)

    return (
        <div>
            {!token || !localStorage.getItem('token') ? <Redirect to="/auth" /> : null}
            <h1>Not Found</h1>
        </div>
    )
}


export default NotFound