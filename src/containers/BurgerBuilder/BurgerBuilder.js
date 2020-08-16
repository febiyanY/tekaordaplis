import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
// import Spinner from '../../components/UI/Spinner/Spinner'
import NProgress from '../../components/UI/NProgress/NProgress'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Auxx'
import * as actionType from '../../store/actions/burgerbuilder'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        error: false
    }

    componentDidMount() {
        this.props.onLoadIngredient()
    }

    pruchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCanceledHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
            search: "?kunci=gembok&mantap=enak"
        })
    }

    render() {

        const disabledInfo = { ...this.props.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? 'Data cannot be loaded' : ''

        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCanceled={this.purchaseCanceledHandler}
                purchaseContinue={this.purchaseContinueHandler}
            />
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
                        ordered={this.pruchaseHandler}
                        isAuth = {this.props.token}
                        {...this.props}
                    />
                </Aux>
            )
        }
        if (this.props.loading) {
            orderSummary = <p>Loading...</p>
        }

        return (
            <>
                {/* {!this.props.token ? <Redirect to="/auth" /> : null} */}
                <NProgress isLoading={this.props.loading} />
                {burger}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchasable: state.burgerBuilder.purchasable,
    loading : state.loader.loading,
    token : state.auth.token
})

const mapDispatchToProps = dispatch => ({
    onLoadIngredient: () => dispatch(actionType.loadIngredient()),
    onAddIngredient: (tipe) => dispatch(actionType.addIngredient(tipe)),
    onRemoveIngredient: (tipe) => dispatch(actionType.removeIngredient(tipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))