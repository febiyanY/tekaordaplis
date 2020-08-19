import React, { useEffect, lazy, Suspense, useCallback } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import NotFound from './components/NotFound/NotFound'
import Logout from './containers/Auth/Logout/Logout'
import { useDispatch, useSelector } from 'react-redux'
import * as actionType from './store/actions/auth'

const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))

const App = props => {

  const dispatch = useDispatch()
  const onCheckUserAuth = useCallback(() => dispatch(actionType.authCheckState()),[dispatch])

  const isAuth = useSelector(state => state.auth.token)

  useEffect(() => {
    onCheckUserAuth()
  }, [onCheckUserAuth])

  let routes = null
  if (isAuth || localStorage.getItem('token')) {
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


export default App
