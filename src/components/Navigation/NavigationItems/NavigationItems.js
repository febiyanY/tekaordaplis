import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigagtionItems = (props) => {
    let links = null
    if (props.isAuthenticated) {
        links = (
            <React.Fragment>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/orders">My Order</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
            </React.Fragment>
        )
    } else {
        links = (
            <React.Fragment>
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                <NavigationItem link="/auth">Login</NavigationItem>
            </React.Fragment>
        )
    }

    return (
        <ul className={classes.NavigagtionItems}>
            {links}
        </ul>
    )

}


export default NavigagtionItems