import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import burgerBuilderReducer from './store/reducers/burgerbuilder'
import ordersReducer from './store/reducers/orders'
import loaderReducer from './store/reducers/loader'
import authReducer from './store/reducers/auth'
import thunk from 'redux-thunk'

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const rootReducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    orders : ordersReducer,
    loader : loaderReducer,
    auth : authReducer
})
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();