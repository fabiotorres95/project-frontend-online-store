import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import Details from './pages/Details';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/cart" component={ ShoppingCart } />
        <Route path="/details/:id" render={ (props) => <Details { ...props } /> } />
        <Route path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
