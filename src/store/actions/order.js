import * as actionType from './actionTypes'
import axios from '../../axios-orders'

export const loadOrders = (token, userId) => {
    return dispatch => {
        dispatch({ type: actionType.SHOW_LOADER })
        axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`).then(res => {
            let orders = []
            for (let order in res.data) {
                orders.push({ id: order, ...res.data[order] })

            }
            dispatch({ type: actionType.LOAD_ORDERS, orders })
            dispatch({ type: actionType.HIDE_LOADER })
        }).catch(err => {
            dispatch({ type: actionType.HIDE_LOADER })
        })
    }
}