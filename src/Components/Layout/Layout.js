import React, { Component } from 'react';
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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

// const Layout = (props) => {
//     return (
//         <React.Fragment>
//             <Toolbar/>
//             <SideDrawer/>
//             <main className = {styles.Content}>
//                 {props.children}
//             </main>
//         </React.Fragment>
//     );
// }

export default Layout;