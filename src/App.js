import React, { Component, lazy, Suspense } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import NotFound from './components/NotFound/NotFound'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionType from './store/actions/auth'

const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))

class App extends Component {

  componentDidMount() {
    this.props.onCheckUserAuth()
  }

  render() {

    let routes = null
    if (this.props.token || localStorage.getItem('token')) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route component={NotFound} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={Auth} />
          <Route component={NotFound} />
        </Switch>
      )
    }

    return (
      <div >
        <React.Fragment>
          <BrowserRouter>
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                {routes}
              </Suspense>
            </Layout>
          </BrowserRouter>
        </React.Fragment>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  onCheckUserAuth: () => dispatch(actionType.authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
