import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className = {styles.NavigationItems}>
        <NavigationItem link = '/' exact>Burger Buider</NavigationItem>
        <NavigationItem link = '/orders'>Checkout</NavigationItem>
    </ul>
)

export default NavigationItems;