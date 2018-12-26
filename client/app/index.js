import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/App';
import Board from './components/Board';

class TheRealThing extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/" component={Board}/>
          </Switch>
        </App>
      </Router>
    );
  }
}

render(<TheRealThing />, document.getElementById('app'));
