import React, { useCallback } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {useSelector} from 'react-redux'

const Checkout = props => {
    const ingredients = useSelector(state => state.burgerBuilder.ingredients)

    const handleProceed = useCallback(() => {
        props.history.replace(`${props.match.url}/contact-data`)
    },[props.history, props.match.url])

    const handleCancel = useCallback(() => {
        props.history.goBack()
    },[props.history])
    
    let page = <Redirect to="/" />
    if (ingredients) {
        page = (
            <div>
                <CheckoutSummary ingredients={ingredients} proceed={handleProceed} cancel={handleCancel} />
                <Route path={`${props.match.url}/contact-data`}
                    component={ContactData}
                    // render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props} />}
                />
            </div>
        )
    }
    return (
        <React.Fragment>
            {page}
        </React.Fragment>

    )
}


export default Checkout