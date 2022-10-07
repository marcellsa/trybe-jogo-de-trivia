import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route path="/game" component={ Game } />
          <Route exact path="/" component={ Login } />
          {/* <Route path="/" component={  } /> */}
          {/* <Route path="/formdisplay" component={ FormDataDisplay } /> */}
        </Switch>
      </main>
    );
  }
}
export default App;