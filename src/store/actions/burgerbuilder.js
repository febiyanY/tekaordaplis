import * as actionType from './actionTypes'
import axios from '../../axios-orders'

export const loadIngredient = () => {
    return dispatch => {
        dispatch({type : actionType.SHOW_LOADER})
        axios.get('/ingredients.json').then(res => {
            dispatch({type : actionType.LOAD_INGREDIENT, ingredients : res.data})
            dispatch({type : actionType.HIDE_LOADER})
        }).catch(err => {
            dispatch({type : actionType.HIDE_LOADER})
        })
    }
}

export const addIngredient = (tipe) => {
    return {
        type : actionType.ADD_INGREDIENT,
        tipe
    }
}
export const removeIngredient = (tipe) => {
    return {
        type : actionType.REMOVE_INGREDIENT,
        tipe
    }
}