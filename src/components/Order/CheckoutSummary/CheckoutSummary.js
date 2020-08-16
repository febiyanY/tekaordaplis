import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classess from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
    
    return (
        <div className={classess.CheckoutSummary}>
            <h1>Enjoy your burger</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancel} >CANCEL</Button>
            <Button btnType="Success" clicked={props.proceed} >CONTINUE</Button>
        </div>
    )


}

export default checkoutSummary