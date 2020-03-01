import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import logInSchema from './log-in-schema';
import { withRouter } from 'react-router-dom';

function LogIn({ history, setLoggedUser }) {
  const [serverInfo, setServerInfo] = useState(null);

  const processServerInfo = serverInfo => {
    console.log(serverInfo);
    if (serverInfo.error) {
      return <div className='error-message'>{serverInfo.message}</div>;
    }
  };

  const renderError = message => {
    return <div className='error-message'>{message}</div>;
  };

  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={logInSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        fetch('/log-in', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(res => res.json())
          .then(data => {
            setServerInfo(data);
            setSubmitting(false);
            if (!data.error) {
              history.push('/');
              setLoggedUser(data.name);
            }
          });
      }}
    >
      <Form className='sign-up-form'>
        <label htmlFor='login'>Login</label>
        <Field id='login' name='login' />
        <ErrorMessage name='login' render={renderError} />

        <label htmlFor='password'>Password</label>
        <Field id='password' name='password' type='password' />
        <ErrorMessage name='password' render={renderError} />

        <button type='submit'>Submit</button>

        {serverInfo && processServerInfo(serverInfo)}
      </Form>
    </Formik>
  );
}

export default withRouter(LogIn);
