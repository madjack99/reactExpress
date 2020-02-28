import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import signUpSchema from './sign-up-schema';

import './sign-up.css';

function SignUp() {
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
    <React.Fragment>
      <Formik
        initialValues={{
          login: '',
          password: '',
          confirmPassword: '',
          email: '',
          name: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          fetch('/sign-up', {
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

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <Field id='confirmPassword' name='confirmPassword' type='password' />
          <ErrorMessage name='confirmPassword' render={renderError} />

          <label htmlFor='email'>Email</label>
          <Field id='email' name='email' type='email' />
          <ErrorMessage name='email' render={renderError} />

          <label htmlFor='name'>Name</label>
          <Field id='name' name='name' />
          <ErrorMessage name='name' render={renderError} />

          <button type='submit'>Submit</button>

          {serverInfo && processServerInfo(serverInfo)}
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default SignUp;
