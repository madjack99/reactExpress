import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUp from '../sign-up';
import Home from '../home';
import LogIn from '../log-in';

import './app.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route path='/' component={Home} exact />
        <Route path='/sign-up' component={SignUp} exact />
        <Route path='/log-in' component={LogIn} exact />
      </div>
    </Router>
  );
}

export default App;
