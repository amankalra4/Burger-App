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
                    placeHolder: 'Your Name'
                },
                value: ''
                 
            },
            street: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeHolder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeHolder: 'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'text',
                    placeHolder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input', // name should be same as the HTML tag
                elementConfig: { // elementConfig will have the attributes of the HTML tag defined above.
                    type: 'email',
                    placeHolder: 'Your E-Mail'
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
        // console.log(this.props.ingredients);
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
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

    render () {
        let form = (
            <form>
                <Input elementType = '...' elementConfig = '...' value = '...'/>
                <Input inputtype = 'input' type = 'email' name = 'email' placeholder = 'Your Email' />
                <Input inputtype = 'input' type = 'text' name = 'street' placeholder = 'Street' />
                <Input inputtype = 'input' type = 'text' name = 'postal' placeholder = 'Postal Code' />
                <Button btnType = 'Success' clicked = {this.orderhandler}>Order</Button>
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