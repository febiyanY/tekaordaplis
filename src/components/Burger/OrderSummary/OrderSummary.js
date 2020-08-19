import React from 'react'
import Aux from '../../../hoc/Auxx'

import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients).map(type => {
        return <li key={type}><span style={{ textTransform: 'capitalize' }}>{type}</span> : {props.ingredients[type]}</li>
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>${props.price.toFixed(2)}</strong></p>
            <p> Continue to checkout ? </p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>

        </Aux>
    )


}

export default OrderSummary