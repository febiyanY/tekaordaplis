import * as actionType from '../actions/actionTypes'

let intialState = {
    orders: null
}

const reducer = (state = intialState, action) => {

    switch (action.type) {
        case actionType.LOAD_ORDERS:
            return {
                ...state,
                orders: action.orders
            }
        default:
            return state
    }
}

export default reducer