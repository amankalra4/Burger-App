import React from 'react';
import Layout from './Conatiners/Layout/Layout';
import BurgerBuilder from './Conatiners/BurgerBuilder/BurgerBuilder';
import Checkout from './Conatiners/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './Conatiners/Orders/Orders';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          {/* The below component is for the page that we want to show once the user selects Continue in the
          modal window. */}
          <Route path = '/checkout' component = {Checkout} />
          {/* Orders component is for dispalying the orders that we have ordered till now... (just a type of
          Previous Orders section). And in the web page, its the "Checkout" link displayed in top right
          corner in the navigation bar. */}
          <Route path = '/orders' component = {Orders} />
          {/* Below component is the default or the first page that appears on the screen */}
          <Route path = '/' exact component = {BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
