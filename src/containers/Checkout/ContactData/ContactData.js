import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
// import Spinner from '../../../components/UI/Spinner/Spinner'
import NProgress from '../../../components/UI/NProgress/NProgress'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import {checkValidity} from '../../../shared/utility'

class ContactData extends Component {
    state = {
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

    handleOrder = (e) => {
        e.preventDefault()
        if (this.state.orderable) {
            this.setState({ loading: true })
            const form = this.state.orderForm
            let formData = {}
            for (let input in form) {
                formData = { ...formData, [input]: form[input].value }
            }
            const order = {
                userId : this.props.userId,
                ingredients: this.props.ingredients,
                price: this.props.totalPrice,
                orderData: formData
            }

            axios.post('/orders.json?auth='+this.props.token, order).then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            }).catch(err => {
                this.setState({ loading: false })
            })
        }
    }

    handleInputChange = (e, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
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
        this.setState({ orderForm: updatedOrderForm, orderable: orderable })
    }


    render() {
        let formContent = []
        let orderForm = this.state.orderForm
        for (let input in orderForm) {
            formContent.push(
                <Input key={input}
                    elementType={orderForm[input].elementType}
                    config={{ name: input, ...orderForm[input].config }}
                    value={orderForm[input].value}
                    invalid={!orderForm[input].valid}
                    shouldValidate={orderForm[input].validation}
                    touched={orderForm[input].touched}
                    onChange={(e) => this.handleInputChange(e, input)} />
            )
        }
        let content = (
            <React.Fragment>
                <h4>Enter your shipping information</h4>
                <form onSubmit={this.handleOrder}>
                    {formContent}
                    <Button disabled={!this.state.orderable} btnType="Success" >ORDER</Button>
                </form>
            </React.Fragment>
        )
        return (
            <React.Fragment>
                <NProgress isLoading={this.state.loading} />
                <div className={classes.ContactData}>
                    {content}
                </div>
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => ({
    ingredients : state.burgerBuilder.ingredients,
    totalPrice : state.burgerBuilder.totalPrice,
    token : state.auth.token,
    userId : state.auth.userId
})

export default connect(mapStateToProps)(ContactData)