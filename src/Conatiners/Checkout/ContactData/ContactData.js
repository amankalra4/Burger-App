import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component {
    state = {
        // name: '',
        // email: '',
        // address: {
        //     street: '',
        //     postalCode: ''
        // },
        orderForm: {
            name: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderhandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
            // customer: {
            //     name: 'Aman',
            //     address: {
            //         street: 'Jammu',
            //         zipCode: '1234',
            //         country: 'India'
            //     },
            //     email: 'test@test.com'
            // },
            // deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then((response) => {
            // console.log(response);
            this.setState({loading: false});
            this.props.history.push('/'); // this pushes or movesIus to the first page.
        })
        .catch((error) => {
            // console.log(error);
            this.setState({loading: false});
        });
    }

    onInputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit = {this.orderhandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        changed = {(event) => this.onInputChangeHandler(event, formElement.id)}/>
                ))}
                <Button btnType = 'Success'>Order</Button>
            </form>
        );
        if(this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className = {styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;