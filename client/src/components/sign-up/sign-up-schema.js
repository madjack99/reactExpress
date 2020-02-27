import * as Yup from 'yup';

const signUpSchema = Yup.object({
  login: Yup.string()
    .min(4, 'Must be at least 3 chars')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Must be at least 4 chars')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
  email: Yup.string()
    .email()
    .required('Required'),
  name: Yup.string()
    .min(2, 'Must be at least 2 chars')
    .required('Required'),
});

export default signUpSchema;
