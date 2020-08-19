import React, { useReducer, useCallback } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import NProgress from '../../../components/UI/NProgress/NProgress'
import Input from '../../../components/UI/Input/Input'
import { checkValidity } from '../../../shared/utility'
import { useSelector } from 'react-redux'

const intialState = {
    orderForm: {
        name: {
            elementType: 'input',
            config: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            config: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'textarea',
            config: {
                type: 'text',
                placeholder: 'Street Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            config: {
                type: 'text',
                placeholder: 'Zip Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            config: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapo' }
                ]
            },
            value: 'fastest',
            touched: false
        }
    },
    loading: false,
    orderable: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                orderForm: action.orderForm,
                orderable: action.orderable
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.value
            }
        default:
            throw new Error('contact data local reducer error')
    }
}

const ContactData = props => {

    const [localState, dispatch] = useReducer(reducer, intialState)

    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)

    const handleOrder = useCallback((e) => {
        e.preventDefault()
        if (localState.orderable) {
            dispatch({ type: 'SET_LOADING', value: true })
            const form = localState.orderForm
            let formData = {}
            for (let input in form) {
                formData = { ...formData, [input]: form[input].value }
            }
            const order = {
                userId: userId,
                ingredients: ingredients,
                price: totalPrice,
                orderData: formData
            }

            axios.post('/orders.json?auth=' + token, order).then(res => {
                dispatch({ type: 'SET_LOADING', value: false })
                props.history.push('/')
            }).catch(err => {
                dispatch({ type: 'SET_LOADING', value: false })
            })
        }
    }, [token, localState.orderable, localState.orderForm, props.history, userId, ingredients, totalPrice])

    const handleInputChange = useCallback((e, identifier) => {
        const updatedOrderForm = {
            ...localState.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        }
        updatedFormElement.value = e.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[identifier] = updatedFormElement
        let invCount = 0
        for (let key in updatedOrderForm) {
            if (updatedOrderForm[key].validation && !updatedOrderForm[key].valid) invCount += 1
        }
        let orderable = invCount === 0
        // this.setState({ orderForm: updatedOrderForm, orderable: orderable })
        dispatch({ type: 'CHANGE_INPUT', orderForm: updatedOrderForm, orderable: orderable })
    }, [localState.orderForm])


    let formContent = []
    let orderForm = localState.orderForm
    for (let input in orderForm) {
        formContent.push(
            <Input key={input}
                elementType={orderForm[input].elementType}
                config={{ name: input, ...orderForm[input].config }}
                value={orderForm[input].value}
                invalid={!orderForm[input].valid}
                shouldValidate={orderForm[input].validation}
                touched={orderForm[input].touched}
                onChange={(e) => handleInputChange(e, input)} />
        )
    }
    let content = (
        <React.Fragment>
            <h4>Enter your shipping information</h4>
            <form onSubmit={handleOrder}>
                {formContent}
                <Button disabled={!localState.orderable} btnType="Success" >ORDER</Button>
            </form>
        </React.Fragment>
    )
    return (
        <React.Fragment>
            <NProgress isLoading={localState.loading} />
            <div className={classes.ContactData}>
                {content}
            </div>
        </React.Fragment>

    )
}


export default ContactData