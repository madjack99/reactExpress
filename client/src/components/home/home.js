import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Home({ loggedUser, history, setLoggedUser }) {
  const handleLogOut = () => {
    fetch('/log-out', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        console.log('log out front');
        history.push('/');
        setLoggedUser(null);
      });
  };

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
      {loggedUser ? <button onClick={handleLogOut}>Log out</button> : null}
    </div>
  );
}

export default withRouter(Home);
