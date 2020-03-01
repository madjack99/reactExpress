import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import SignUp from '../sign-up';
import Home from '../home';
import LogIn from '../log-in';

import './app.css';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Router>
      <div className='App'>
        <Route path='/'>
          <Home loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
        </Route>
        <Route path='/sign-up' exact>
          {loggedUser ? (
            <Redirect to='/' />
          ) : (
            <SignUp setLoggedUser={setLoggedUser} />
          )}
        </Route>
        <Route path='/log-in' exact>
          {loggedUser ? (
            <Redirect to='/' />
          ) : (
            <LogIn setLoggedUser={setLoggedUser} />
          )}
        </Route>
      </div>
    </Router>
  );
}

export default App;
