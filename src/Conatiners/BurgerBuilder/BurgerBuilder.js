import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 50,
    bacon: 70,
    cheese: 40,
    meat: 100
}

class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 40,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://my-burger-db-c34c2.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }

    addIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice});
        this.setState({ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice});
        this.setState({ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((acc, curr) => acc + curr, 0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert('You can continue!');
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            this.setState({loading: false, purchasing: false});
        })
        .catch((error) => {
            // console.log(error);
            this.setState({loading: false, purchasing: false});
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients } // Copying state in an im-mutable way.
        
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        } // disabledInfo will be like: {salad: true, meat: false, bacon: true, cheese: true}

        let orderSummary = null;
        if(this.state.ingredients) {
            orderSummary = <OrderSummary 
                            ingredients = {this.state.ingredients} 
                            purchaseCancelled = {this.purchaseCancelHandler}
                            purchaseContinued = {this.purchaseContinueHandler} 
                            price = {this.state.totalPrice}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? <p><strong>Ingredients can't be loaded</strong></p> : <Spinner />;
        if(this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredienthandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabledProp = {disabledInfo}
                        priceProp = {this.state.totalPrice}
                        purchasableProp = {this.state.purchasable}
                        purchasingProp = {this.purchaseHandler}/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);