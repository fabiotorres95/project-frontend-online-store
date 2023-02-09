import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <Route path="/" component={ Home } />
    );
  }
}

export default App;
