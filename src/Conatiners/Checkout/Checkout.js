import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../Components/Order/Checkout Summary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
        },
        totalPrice: 0
    }

    componentDidMount() {
        console.log('before', this.props.location.search); // bacon=2&cheese=3&meat=4&salad=1
        // let y = this.props.location.search;
        // let x1 = decodeURIComponent(y);
        // console.log('x is: ', x1)
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        // we can also use for (let param of query.entries()) { } Here param is the key, we dont use the value
        for (let [key, value] of query.entries()) {
            // it will have values like this ['salad', '1']

            // console.log(ingredients[param[0]]); // undef, undef, undef, undef
            // console.log(param[1]); // 2, 3, 4, 1
            
            // ingredients[param[0]] = +param[1]
            ingredients[key] = +value;

            if(key === 'price') {
                price = +value;
            }
            else {
                ingredients[key] = +value;
            }

            // console.log(param[1]); // 2 is printed as a string.

            // console.log(+param[1]); // 2 is printed as a number. to change the digit to number we use +
            // before param[1]

            // console.log(ingredients[param[0]]); // 2, 3, 4, 1
            // console.log(param[1]); // 2, 3, 4, 1
        }
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients = {this.state.ingredients} 
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler} />
                {console.log('aman11', this.props.match.path)}
                <Route 
                    path = {this.props.match.path + '/contact-data'} 
                    // component = {ContactData} />
                    // using props below so as to pass the Route props to the ContactData component
                    render = {(props) => <ContactData 
                                                ingredients = {this.state.ingredients} 
                                                price = {this.state.totalPrice} 
                                                {...props} />} />
            </div>
        );
    }
}

export default Checkout;