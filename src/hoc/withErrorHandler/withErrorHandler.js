import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxx'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props)
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({errorData : null})
                return req
            })
            this.resInter = axios.interceptors.response.use(res => res, error => {
                this.setState({errorData : error})
            })
        }
        state = {
            errorData : null
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter)
            axios.interceptors.response.eject(this.resInter)
        }

        handleConfirmError = () => {
            this.setState({error : null})
        }

        render(){
            return (
                <Aux>
                    <Modal show = {this.state.error} modalClosed={this.handleConfirmError}>
                        {this.state.errorData ? this.state.errorData.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }   
}

export default withErrorHandler