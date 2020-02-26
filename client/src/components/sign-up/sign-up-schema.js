import * as Yup from 'yup';

const signUpSchema = Yup.object({
  login: Yup.string()
    .min(4, 'Must be at least 4 chars')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Must be at least 4 chars')
    .required('Required'),
});

export default signUpSchema;
