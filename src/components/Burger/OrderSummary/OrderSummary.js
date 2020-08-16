import React, { Component } from 'react'
import Aux from '../../../hoc/Auxx'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {


    shouldComponentUpdate(nextProps, nextState){
        return this.props.ingredients !== nextProps.ingredients
    }

    // componentDidUpdate(){
    //     console.log('[OrderSummary] componentDidUpdate')
    // }

    render(){
        
        const ingredientSummary = Object.keys(this.props.ingredients).map(type => {
            return <li key={type}><span style={{ textTransform: 'capitalize' }}>{type}</span> : {this.props.ingredients[type]}</li>
        })
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>${this.props.price.toFixed(2)}</strong></p>
                <p> Continue to checkout ? </p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
    
            </Aux>
        )
    }

    
}

export default OrderSummary