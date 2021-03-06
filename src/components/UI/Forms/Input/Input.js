import React from 'react';

import classes from './Input.css'; 

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    
    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if(props.invalid && props.touched) {
        validationError = <p> {props.name} is too short! Please enter atleast {props.minReqChar} characters! </p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />; 
        
    }
    
    return (
        <div className={classes.Input} >
        <label className={classes.Label} >{props.label}</label>
        {inputElement}
        {validationError}
        </div>
    );
    
};

export default input; 