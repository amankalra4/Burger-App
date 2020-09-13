import React, { Component } from 'react';
import styles from './Modal.module.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('nextProps: ', nextProps.show);
        // console.log('this.props: ', this.props.show);
        // console.log('heyyyyy', nextProps === this.props)
        // We  need the component to update only if the value of show change, so we keep the below condition
        return nextProps.show !== this.props.show
    }
    
    render () {
        return (
            <React.Fragment>
                <BackDrop show = {this.props.show} clicked = {this.props.modalClosed}/>
                <div className = {styles.Modal} style = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'}}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;