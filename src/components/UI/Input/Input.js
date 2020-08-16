import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null
    let inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched ){
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.onChange} />
            break
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.onChange} />
            break
        case ('select'):
            let options = props.config.options.map(option => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            })
            inputElement = <select className={inputClasses.join(' ')} value={props.value} name={props.config.name} onChange={props.onChange} >{options}</select>
            break
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.onChange} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

}

export default input