import React, {Component} from 'react'
import Order from '../../components/Order/Order'
// import Spinner from '../../components/UI/Spinner/Spinner'
import NProgress from '../../components/UI/NProgress/NProgress'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/order'
import {connect} from 'react-redux'

class Orders extends Component{

    // state = {
    //     orders : null
    // }

    componentDidMount(){
        // axios.get('/orders.json').then(res => {
        //     let orders = []
        //     for(let order in res.data){
        //         orders.push({id : order, ...res.data[order]})
        //     }
        //     this.setState({orders : orders})
        // }).catch(err => console.log(err))
        
        // this.props.onLoadOrders(this.props.token)
        this.props.onLoadOrders(localStorage.getItem('token'), localStorage.getItem('userId'))
    }

    render(){
        let page = ''
        if(this.props.orders){
            page = this.props.orders.map(order => {
                return <Order key={order.id} ingredient={order.ingredients} totalPrice={order.price} />
            })
        }
        return (
            <div>
                <NProgress isLoading={this.props.loader} />
                {page}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    orders : state.orders.orders,
    loader : state.loader.loading,
    token : state.auth.token,
    userId : state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onLoadOrders : (token, userId) => dispatch(actionTypes.loadOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))