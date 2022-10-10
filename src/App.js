import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/settings" component={ Settings } />
          {/* <Route path="/formdisplay" component={ FormDataDisplay } /> */}
        </Switch>
      </main>
    );
  }
}
export default App;
