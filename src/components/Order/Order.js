import React from 'react'
import classess from './Order.module.css'

const order = (props) => (

    <div className={classess.Order}>
        <p>Ingredients : | Salad ({props.ingredient.salad}) | Bacon ({props.ingredient.bacon}) | Cheese ({props.ingredient.cheese}) | Meat ({props.ingredient.meat}) </p>
        <p>Price : <strong>USD {props.totalPrice.toFixed(2)}</strong> </p>
    </div>
)

export default order