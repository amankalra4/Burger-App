import React from 'react';
import styles from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for(let ingredientName in props.ingredients) {
        // Here we are pushing an object into the array. So ingredients is an array containing objects.
        ingredients.push({ name: ingredientName, amount:props.ingredients[ingredientName] })
    }
    
    // We are using filter here because in the DB, price is present under ingredients, so if name!=='price'
    // then only we will execute the map method.
    const ingredientOutput = ingredients.filter(name => name.name !== 'price').map(ig => {
        return (
            <span 
                style = {{
                            textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                        }}
                key = {ig.name}>
            {ig.name} ({ig.amount})
            </span>
        )
    })

    return (
        <div className = {styles.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price} Rupees</strong></p>
        </div>
    );
}

export default Order;