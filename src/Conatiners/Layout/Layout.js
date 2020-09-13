import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        }) // always use this when state depends on the old state
    }

    render() {
        return (
        <React.Fragment>
            <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerClosedHandler}/>
            <main className = {styles.Content}>
                {this.props.children}
            </main>
        </React.Fragment>
        );
    }
}

export default Layout;