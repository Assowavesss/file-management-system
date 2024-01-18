/*
import type InputFormAuthProps from '@/components/InputFormAuth';
import type SignInFormProps from './signInForm.props';

import api from '@/HttpClient';

const SignInFormFields: InputFormAuthProps<SignInFormProps>[] = [
  {
    type: 'email',
    name: 'email',
    registerOpt: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      validate: async (value: string) => {
        const resp = (
          await api.post(
            'account/v1/account/verify',
            new URLSearchParams({ 'email': value }),
            new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
          )
        ).status;
        return resp === 201 || resp === 202;
      },
    },
    placeholder: 'Email',
    srcImage: '/icons/mail.svg',
    errorMessage: 'Email should be validated',
  },
  {
    type: 'password',
    name: 'password',
    registerOpt: {
      required: true,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
    },
    placeholder: 'Password',
    srcImage: '/icons/key.svg',
    errorMessage: 'Invalid password',
  },
];

export default SignInFormFields;
*/
