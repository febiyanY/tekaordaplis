import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'

class Checkout extends Component {


    handleProceed = () => {
        this.props.history.replace(`${this.props.match.url}/contact-data`)
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    render() {
        let page = <Redirect to="/" />
        if (this.props.ingredients) {
            page = (
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients} proceed={this.handleProceed} cancel={this.handleCancel} />
                    <Route path={`${this.props.match.url}/contact-data`}
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
}

const mapStateToProps = state => ({
    ingredients : state.burgerBuilder.ingredients
})

export default connect(mapStateToProps)(Checkout)