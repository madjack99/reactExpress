import React from 'react';
import { Link } from 'react-router-dom';

function Home({ loggedUser }) {
  return (
    <div>
      <h1>Home</h1>
      <h2>{loggedUser && <span>{`Hi, ${loggedUser}`}</span>}</h2>
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
