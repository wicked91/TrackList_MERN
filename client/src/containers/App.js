import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  Home,
  ShopPage,
  MakeShop
} from 'pages'

class App extends Component {

  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/shoppage" component={ShopPage} />
        <Route exact path="/makeshop" component={MakeShop} />
      </div>
    );
  }
}

export default App;
