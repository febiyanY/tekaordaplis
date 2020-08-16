import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const notFound = (props) => {

    return (
        <div>
            {!props.token || !localStorage.getItem('token') ? <Redirect to="/auth" /> : null}
            <h1>Not Found</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    token : state.auth.token
})

export default connect(mapStateToProps)(notFound)