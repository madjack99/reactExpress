import React from 'react';
import { useFormik } from 'formik';

import signUpSchema from './sign-up-schema';

function SignUp() {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='login'>Login</label>
      <input
        type='text'
        id='login'
        name='login'
        onChange={formik.handleChange}
        value={formik.values.login}
      />
      {formik.touched.login && formik.errors.login ? (
        <div>{formik.errors.login}</div>
      ) : null}
      <br />
      <label htmlFor='password'>Password</label>
      <input
        type='text'
        id='password'
        name='password'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <br />
      <button>Submit</button>
    </form>
  );
}

export default SignUp;
