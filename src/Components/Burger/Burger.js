import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => (
                    <BurgerIngredient key = {igKey + i} type = {igKey} />
            ))
        });
    return (
        <div className = {styles.Burger}>
            <BurgerIngredient type = 'bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type = 'bread-bottom'/>
        </div>
    );
}

export default Burger;