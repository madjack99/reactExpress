import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignUp from '../sign-up';
import Home from '../home';
import LogIn from '../log-in';

import './app.css';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Router>
      <div className='App'>
        <Route path='/' exact>
          <Home loggedUser={loggedUser} />
        </Route>
        <Route path='/sign-up' exact>
          <SignUp setLoggedUser={setLoggedUser} />
        </Route>
        <Route path='/log-in' exact>
          <LogIn setLoggedUser={setLoggedUser} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
