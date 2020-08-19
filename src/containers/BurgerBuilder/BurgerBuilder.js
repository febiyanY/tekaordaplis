import React, { useState, useEffect, useCallback } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import NProgress from '../../components/UI/NProgress/NProgress'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/Auxx'
import * as actionType from '../../store/actions/burgerbuilder'
import { useDispatch, useSelector } from 'react-redux'
// import {Redirect} from 'react-router-dom'

export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)
    const [error, setError] = useState(false)


    const loading = useSelector(state => state.loader.loading)
    const isAuth = useSelector(state => state.auth.token)
    const {ingredients, totalPrice, purchasable} = useSelector(state => state.burgerBuilder)

    const storeDispatch = useDispatch()

    const onLoadIngredient = useCallback(() => storeDispatch(actionType.loadIngredient()),[storeDispatch])
    const onAddIngredient = useCallback((tipe) => storeDispatch(actionType.addIngredient(tipe)),[storeDispatch]) 
    const onRemoveIngredient = useCallback((tipe) => storeDispatch(actionType.removeIngredient(tipe)),[storeDispatch])

    useEffect(() => {
        onLoadIngredient()   
    },[onLoadIngredient])

    const pruchaseHandler = useCallback(() => {
        setPurchasing(true)
    },[])

    const purchaseCanceledHandler = useCallback(() => {
        setPurchasing(false)
    },[])

    const purchaseContinueHandler = useCallback(() => {
        props.history.push({
            pathname: '/checkout',
            search: "?kunci=gembok&mantap=enak"
        })
    },[props.history])

    const disabledInfo = { ...ingredients }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null
    let burger = error ? 'Data cannot be loaded' : ''

    if (ingredients) {
        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCanceled={purchaseCanceledHandler}
            purchaseContinue={purchaseContinueHandler}
        />
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onAddIngredient}
                    ingredientRemoved={onRemoveIngredient}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchasable={purchasable}
                    ordered={pruchaseHandler}
                    isAuth={isAuth}
                    {...props}
                />
            </Aux>
        )
    }
    if (loading) {
        orderSummary = <p>Loading...</p>
    }
    return (
        <>
            {/* {!props.token ? <Redirect to="/auth" /> : null} */}
            <NProgress isLoading={loading} />
            {burger}
            <Modal show={purchasing} modalClosed={purchaseCanceledHandler}>
                {orderSummary}
            </Modal>
        </>
    )
}

export default withErrorHandler(BurgerBuilder, axios)