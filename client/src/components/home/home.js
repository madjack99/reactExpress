import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to='/sign-up'>Sign up</Link>
        </li>
        <li>
          <Link to='/log-in'>Log in</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
