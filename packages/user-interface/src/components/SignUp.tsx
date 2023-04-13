import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import { User } from '../types';
import '../pages/Register/index.scss';

interface SignUpErrors {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  user: User;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: SignUpErrors;
}

export function SignUp({ user, handleInput, errors }: SignUpProps) {
  return (
    <form className='register__form' autoComplete='off'>
      <Input
        label='Name'
        type='text'
        name='name'
        placeholder='Enter your name'
        value={user.name}
        onChange={handleInput}
        errors={errors.name}
      />
      <Input
        label='Username'
        type='text'
        name='username'
        placeholder='Enter your username'
        value={user.username}
        onChange={handleInput}
        errors={errors.username}
      />
      <Input
        label='Email'
        type='text'
        name='email'
        placeholder='sample@mail.com'
        value={user.email}
        onChange={handleInput}
        errors={errors.email}
      />

      <Input
        label='Password'
        type='password'
        name='password'
        placeholder='************'
        value={user.password}
        onChange={handleInput}
        errors={errors.password}
      />

      <Input
        label='Confirm Password'
        type='password'
        name='confirmPassword'
        placeholder='************'
        value={user.confirmPassword}
        errors={errors.confirmPassword}
        onChange={handleInput}
      />
      <p>
        Already have an account?
        <Link to='/login' className='register__link'>
          {' '}
          Sign In
        </Link>
      </p>
    </form>
  );
}
