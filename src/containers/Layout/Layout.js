import React, { useState, useRef, useEffect} from 'react'
import Aux from '../../hoc/Auxx'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {useSelector} from 'react-redux'

const Layout = props => {
    
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const sideDrawer = useRef()
    const isAuth = useSelector(state => state.auth.token)
    
    useEffect(() => {
        sideDrawer.current=showSideDrawer
    })

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        sideDrawer.current ? setShowSideDrawer(false) : setShowSideDrawer(true)
    }

    return (
        <Aux>
            <Toolbar
                isAuth={isAuth}
                toggleSide={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuth={isAuth}
                open={showSideDrawer} closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )


}


export default Layout