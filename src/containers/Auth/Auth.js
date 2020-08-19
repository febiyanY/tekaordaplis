import React, { useReducer, useCallback, useRef, useEffect } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import NProgress from '../../components/UI/NProgress/NProgress'

import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../shared/utility'
import * as actionType from '../../store/actions/auth'
import {useDispatch, useSelector} from 'react-redux'

const intialState = {
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
    isSignUp: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                controls: action.payload
            }
        case 'SWITCH_MODE':
            return {
                ...state,
                isSignUp: action.payload
            }
        default:
            throw new Error('local auth reducer error')

    }
}

const Auth = props => {
    
    const [localState, dispatch] = useReducer(reducer, intialState)
    const isSignUpRef = useRef()
    
    const loading = useSelector(state => state.loader.loading)
    const error = useSelector(state => state.auth.error)
    const isAuth = useSelector(state => state.auth.token)
    const purchasable = useSelector(state => state.burgerBuilder.purchasable)

    const storeDispatch = useDispatch()
    const onAuth = useCallback((authData, mode) => storeDispatch(actionType.authStart(authData, mode)),[storeDispatch])
    
    useEffect(() => {
        isSignUpRef.current = localState.isSignUp
    })

    const handleInputChange = (e, identifier) => {
        const authForm = {
            ...localState.controls
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
        // this.setState({ controls: authForm })
        dispatch({type : 'SET', payload : authForm})
    }

    const handleAuth = useCallback((e) => {
        e.preventDefault()
        const form = localState.controls
        let formData = {}
        for (let input in form) {
            formData = { ...formData, [input]: form[input].value }
        }
        let mode = localState.isSignUp ? 'signup' : 'login'
        onAuth(formData, mode)
        // console.log(formData)
    },[onAuth, localState.isSignUp, localState.controls])

    const handleSwitchAuthMode = useCallback(() => {
        isSignUpRef.current ? dispatch({type : 'SWITCH_MODE', payload : false}) : dispatch({type : 'SWITCH_MODE', payload : true})
    },[])

    let formContent = []
    let authForm = localState.controls
    for (let input in authForm) {
        formContent.push(
            <Input key={input}
                elementType={authForm[input].elementType}
                config={{ name: input, ...authForm[input].config }}
                value={authForm[input].value}
                invalid={!authForm[input].valid}
                shouldValidate={authForm[input].validation}
                touched={authForm[input].touched}
                onChange={(e) => handleInputChange(e, input)} />
        )
    }
    let redirectTo = purchasable ? '/checkout' : '/'
    let errorMsg = null
    if (error) {
        if (error == 'EMAIL_NOT_FOUND' ||error == 'INVALID_PASSWORD') {
            errorMsg = 'Email or Password Incorrect'
        } else {
            errorMsg = error.replaceAll('_', ' ')
        }
    }
    return (
        <React.Fragment>
            {isAuth ? <Redirect to={redirectTo} /> : null}
            <NProgress isLoading={loading} />
            <div className={classes.Auth}>
                {errorMsg}
                <form onSubmit={handleAuth}>
                    {formContent}
                    <Button btnType="Success" >{localState.isSignUp ? 'SIGNUP' : 'LOGIN'}</Button>
                </form>
                <Button btnType="Danger" clicked={handleSwitchAuthMode}>To {localState.isSignUp ? 'LOGIN' : 'SIGNUP'}</Button><br />

            </div>

        </React.Fragment>

    )
}


export default Auth