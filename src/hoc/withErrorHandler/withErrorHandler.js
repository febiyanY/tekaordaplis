import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [errorData, setErrorData] = useState(null)

        const reqInter = axios.interceptors.request.use(req => {
            setErrorData(null)
            return req
        })
        const resInter = axios.interceptors.response.use(res => res, error => {
            setErrorData(error)
        })

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInter)
                axios.interceptors.response.eject(resInter)
            }
        },[reqInter, resInter])

        const handleConfirmError = () => {
            setErrorData(null)
        }

        return (
            <Aux>
                <Modal show={errorData} modalClosed={handleConfirmError}>
                    {errorData ? errorData.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler