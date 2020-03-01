import React from 'react';
import { Link } from 'react-router-dom';

function Home({ loggedUser }) {
  return (
    <div>
      <h1>Header</h1>
      <h2>
        {loggedUser && <span>{`Hi, ${loggedUser}, you're logged in`}</span>}
      </h2>
      <ul>
        {loggedUser ? (
          <h2>Confidential Info</h2>
        ) : (
          <>
            {' '}
            <li>
              <Link to='/sign-up'>Sign up</Link>
            </li>
            <li>
              <Link to='/log-in'>Log in</Link>
            </li>
          </>
        )}
        <li>
          <Link to='/'>Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
