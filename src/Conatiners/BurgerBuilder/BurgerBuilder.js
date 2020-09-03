import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 50,
    bacon: 70,
    cheese: 40,
    meat: 100
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 40,
        purchasable: false,
        purchasing: false
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
        alert('You can continue!');
    }

    render() {
        const disabledInfo = { ...this.state.ingredients } // Copying state in an im-mutable way.
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        } // disabledInfo will be like: {salad: true, meat: false, bacon: true, cheese: true}
        return (
            <React.Fragment>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                                ingredients = {this.state.ingredients} 
                                purchaseCancelled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler} />
                </Modal>
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
}

export default BurgerBuilder;