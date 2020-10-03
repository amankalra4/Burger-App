import React from 'react';
import styles from './Input.module.css'

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];

    if(props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
    }

    // React does not recognize the `inputType` prop on a DOM element
    // from React 16 onwards we should always use inputtype not inputType
    switch (props.elementType) {
        case ('input'):
            // inputElement = <input className = {styles.InputElement} {...props} />;
            inputElement = <input 
                                className = {inputClasses.join(' ')}
                                {...props.elementConfig}
                                value = {props.value}
                                 onChange = {props.changed}/>;
            break;
        
        case ('textarea'):
            inputElement = <textarea 
                                className = {inputClasses.join(' ')}
                                {...props.elementConfig}
                                value = {props.value}
                                onChange = {props.changed}/>;
            break;

        case ('select'):
            inputElement = (
                        <select 
                            className = {inputClasses.join(' ')}
                            value = {props.value}
                            onChange = {props.changed}>
                            {props.elementConfig.options.map(option => (
                                <option key = {option.value} value = {option.value}>{option.displayValue}</option>
                            ))}
                        </select>
                    );
            break;
    
        default:
            inputElement = <input 
                                className = {inputClasses.join(' ')}
                                {...props.elementConfig}
                                value = {props.value}
                                onChange = {props.changed}/>;
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