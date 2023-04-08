import * as yup from 'yup';

const RegisterDTO = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(5, 'Name field minimal 5 character')
      .required('Name is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Combination email not valid'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password minimal 8 characters'),
  }),
});

const LoginDTO = yup.object({
  body: yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Combination email not valid'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password minimal 8 characters'),
  }),
});

export { RegisterDTO, LoginDTO };
