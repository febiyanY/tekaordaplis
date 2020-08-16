import React from 'react'
import {NavLink } from 'react-router-dom'
import classes from './NavigationItem.module.css'


const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        {/* <a className={props.active ? classes.active : null} href={props.link}>{props.children}</a> */}
        <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>{props.children}</NavLink>
    </li>
)

export default NavigationItem