import React, { useEffect, useCallback } from 'react'
import Order from '../../components/Order/Order'
import NProgress from '../../components/UI/NProgress/NProgress'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/order'
import {useSelector, useDispatch} from 'react-redux'

const Orders = props => {

    const orders  = useSelector(state => state.orders.orders) 
    const loading = useSelector(state => state.loader.loading) 
    
    const dispatch = useDispatch()
    const onLoadOrders = useCallback((token, userId) => dispatch(actionTypes.loadOrders(token, userId)),[dispatch])

    useEffect(() => {
        onLoadOrders(localStorage.getItem('token'), localStorage.getItem('userId'))
    }, [onLoadOrders])

    let page = ''
    if (orders) {
        page = orders.map(order => {
            return <Order key={order.id} ingredient={order.ingredients} totalPrice={order.price} />
        })
    }
    return (
        <div>
            <NProgress isLoading={loading} />
            {page}
        </div>
    )
}

export default withErrorHandler(Orders, axios)