import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            customer: {
                name: 'Aman',
                address: {
                    street: 'Jammu',
                    zipCode: '1234',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then((response) => {
            // console.log(response);
            this.setState({loading: false});
            this.props.history.push('/'); // this pushes or moves us to the first page.
        })
        .catch((error) => {
            // console.log(error);
            this.setState({loading: false});
        });
    }

    render () {
        let form = (
            <form>
                <input className = {styles.Input} type = 'text' name = 'name' placeholder = 'Your Name' />
                <input className = {styles.Input} type = 'email' name = 'email' placeholder = 'Your Email' />
                <input className = {styles.Input} type = 'text' name = 'street' placeholder = 'Street' />
                <input className = {styles.Input} type = 'text' name = 'postal' placeholder = 'Postal Code' />
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