import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer = (props) => {
    let attachedClassStyles  = [styles.SideDrawer, styles.Close];
    if(props.open) {
        attachedClassStyles = [styles.SideDrawer, styles.Open]
    }
    return (
        <React.Fragment>
            <BackDrop show = {props.open} clicked = {props.closed}/>
            {/* If you are passing a boolean value as true, then there is no need to write true explicitly
            Here if we write <BackDrop show/> it would mean <BackDrop show = {true} /> */}
            <div className = {attachedClassStyles.join(' ')}>
                {/* <Logo height = '11%'/> */}
                <div className ={styles.Logo}>
                    <Logo />
                </div>
                    <NavigationItems/>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;