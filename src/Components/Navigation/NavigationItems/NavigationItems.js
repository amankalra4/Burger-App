import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className = {styles.NavigationItems}>
        <NavigationItem link = '/'>Burger Buider</NavigationItem>
        <NavigationItem link = '/'>Checkout</NavigationItem>
    </ul>
)

export default NavigationItems;