import * as actionType from '../actions/actionTypes'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

let initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false
}

const updatePurchaseState = (ingredients) => {
    let price = 4
    const sum = Object.keys(ingredients).map(type => {
        price += (ingredients[type] * INGREDIENT_PRICES[type])
        return ingredients[type]
    }).reduce((sum, el) => {
        return sum + el
    }, 0)

    return { purchasable: sum > 0, price }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.LOAD_INGREDIENT:
            const purchasable = updatePurchaseState(action.ingredients)
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: purchasable.price,
                purchasable: purchasable.purchasable
            }
        case actionType.ADD_INGREDIENT:
            const updatedIngredients = { ...state.ingredients }
            updatedIngredients[action.tipe] = state.ingredients[action.tipe] + 1
            const purchasablex = updatePurchaseState(updatedIngredients)
            return {
                ...state,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.tipe],
                ingredients: updatedIngredients,
                purchasable: purchasablex.purchasable
            }
        case actionType.REMOVE_INGREDIENT:
            const countOld = state.ingredients[action.tipe]
            if (countOld !== 0) {
                const updatedIngredients = { ...state.ingredients }
                updatedIngredients[action.tipe] = countOld - 1
                const purchasable = updatePurchaseState(updatedIngredients)
                return {
                    ...state,
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.tipe],
                    ingredients: updatedIngredients,
                    purchasable: purchasable.purchasable
                }
            } else {
                return state
            }
        default:
            return state

    }
}


export default reducer