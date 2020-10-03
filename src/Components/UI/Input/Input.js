import React from 'react';
import styles from './Input.module.css'

const Input = (props) => {
    let inputElement = null;

    // React does not recognize the `inputType` prop on a DOM element
    // from React 16 onwards we should always use inputtype not inputType
    switch (props.inputtype) {
        case ('input'):
            // inputElement = <input className = {styles.InputElement} {...props} />;
            inputElement = <input 
                                className = {styles.InputElement}
                                {...props.elementConfig}
                                value = {props.value} />;
            break;
        
        case ('textarea'):
            inputElement = <textarea 
                                className = {styles.InputElement}
                                {...props.elementConfig}
                                value = {props.value}/>;
            break;
    
        default:
            inputElement = <input 
                                className = {styles.InputElement}
                                {...props.elementConfig}
                                value = {props.value}/>;
            break;
    }
    return (
        <div className = {styles.Input}>
            <label className = {styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;