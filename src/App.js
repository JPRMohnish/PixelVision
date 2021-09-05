import React from 'react';
import './App.css';
import Login from './components/Login';
import Random from './components/Random';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "World!"
    }
  }

  render() {
    return <Router>
       <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/random">
            <Random />
          </Route>
          <Route path="/">
            <h2>404 not found</h2>
          </Route>
        </Switch>
    </Router>
  }
}

export default App;
