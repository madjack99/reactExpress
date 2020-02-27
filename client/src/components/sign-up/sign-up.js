import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import signUpSchema from './sign-up-schema';

import './sign-up.css';

function SignUp() {
  const renderError = message => {
    return <div className='error-message'>{message}</div>;
  };

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={signUpSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      <Form className='sign-up-form'>
        <label htmlFor='login'>Login</label>
        <Field id='login' name='login' />
        <ErrorMessage name='login' render={renderError} />
        <label htmlFor='password'>Password</label>
        <Field id='password' name='password' type='password' />
        <ErrorMessage name='password' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );

  // const formik = useFormik({
  //   initialValues: {
  //     login: '',
  //     password: '',
  //   },
  //   validationSchema: signUpSchema,
  //   onSubmit: values => {
  //     console.log(values);
  //   },
  // });

  // return (
  //   <form onSubmit={formik.handleSubmit}>
  //     <label htmlFor='login'>Login</label>
  //     <input name='login' id='login' {...formik.getFieldProps('login')} />
  //     {formik.touched.login && formik.errors.login ? (
  //       <div>{formik.errors.login}</div>
  //     ) : null}
  //     <br />
  //     <label htmlFor='password'>Password</label>
  //     <input
  //       type='password'
  //       id='password'
  //       name='password'
  //       {...formik.getFieldProps('password')}
  //     />
  //     {formik.touched.password && formik.errors.password ? (
  //       <div>{formik.errors.password}</div>
  //     ) : null}
  //     <br />
  //     <button type='submit'>Submit</button>
  //   </form>
  // );
}

export default SignUp;
