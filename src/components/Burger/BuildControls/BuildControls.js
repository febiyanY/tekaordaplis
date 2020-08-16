import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Currect Price : <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl key={ctrl.label} label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        })}
        <button onClick={props.isAuth ? props.ordered : () => props.history.push('/auth')} disabled={!props.purchasable} className={classes.OrderButton}>
            {props.isAuth ? 'ORDER NOW' : 'LOGIN'}
        </button>
    </div>
)

export default BuildControls