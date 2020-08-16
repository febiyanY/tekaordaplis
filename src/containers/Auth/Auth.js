import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import NProgress from '../../components/UI/NProgress/NProgress'
import * as actionType from '../../store/actions/auth'
import {Redirect} from 'react-router-dom'
import {checkValidity} from '../../shared/utility'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isSignUp: false
    }

    handleInputChange = (e, identifier) => {
        const authForm = {
            ...this.state.controls
        }
        const updatedFormElement = {
            ...authForm[identifier]
        }
        updatedFormElement.value = e.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        authForm[identifier] = updatedFormElement
        // let invCount = 0
        // for (let key in authForm) {
        //     if (authForm[key].validation && !authForm[key].valid) invCount += 1
        // }
        // let isFormValid = invCount === 0
        // this.setState({ controls: authForm, isFormValid })
        this.setState({ controls: authForm })
    }

    handleAuth = (e) => {
        e.preventDefault()
        const form = this.state.controls
        let formData = {}
        for (let input in form) {
            formData = { ...formData, [input]: form[input].value }
        }
        let mode = this.state.isSignUp ? 'signup' : 'login'
        this.props.onAuth(formData, mode)
        // console.log(formData)
    }

    handleSwitchAuthMode = () => {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp }
        })
    }


    render() {
        let formContent = []
        let authForm = this.state.controls
        for (let input in authForm) {
            formContent.push(
                <Input key={input}
                    elementType={authForm[input].elementType}
                    config={{ name: input, ...authForm[input].config }}
                    value={authForm[input].value}
                    invalid={!authForm[input].valid}
                    shouldValidate={authForm[input].validation}
                    touched={authForm[input].touched}
                    onChange={(e) => this.handleInputChange(e, input)} />
            )
        }
        let redirectTo = this.props.purchasable ? '/checkout' : '/'
        let errorMsg = null
        if(this.props.error){
            if(this.props.error == 'EMAIL_NOT_FOUND' || this.props.error == 'INVALID_PASSWORD'){
                errorMsg = 'Email or Password Incorrect'
            }else{
                errorMsg = this.props.error.replaceAll('_',' ')
            }
        }
        return (
            <React.Fragment>
                {this.props.token ? <Redirect to={redirectTo}/> : null}
                <NProgress isLoading={this.props.loading} />
                <div className={classes.Auth}>
                {errorMsg}
                    <form onSubmit={this.handleAuth}>
                        {formContent}
                        <Button btnType="Success" >{this.state.isSignUp ? 'SIGNUP' : 'LOGIN'}</Button>
                    </form>
                    <Button btnType="Danger" clicked={this.handleSwitchAuthMode}>To {this.state.isSignUp ? 'LOGIN' : 'SIGNUP'}</Button><br/>
                    
                </div>
                
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => ({
    loading: state.loader.loading,
    error : state.auth.error,
    token : state.auth.token,
    purchasable : state.burgerBuilder.purchasable
})

const mapDispatchToProps = dispatch => ({
    onAuth: (authData, mode) => dispatch(actionType.authStart(authData, mode)),
    onAuthSuccess: (authData) => dispatch(actionType.authSuccess(authData)),
    onAuthFail: (error) => dispatch(actionType.authSuccess(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)