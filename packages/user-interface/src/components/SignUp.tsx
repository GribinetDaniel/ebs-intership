import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';
import { ErrorMessage } from './ErrorMessage';

export interface SignUpProps {
  name: string;
  username: string;
  email: string;
  password: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  confirmPassword: string;
  errors?: any;
}

export function SignUp({
  name,
  username,
  email,
  password,
  handleInput,
  confirmPassword,
  errors,
}: SignUpProps) {
  return (
    <form className='register__form' autoComplete='off'>
      <Input
        label='Name'
        classNameLabel='register__label'
        type='text'
        id='name'
        name='name'
        className='auth__input'
        placeholder='Enter your name'
        value={name}
        onChange={handleInput}
        errors={errors.name}
      />
      <Input
        label='Username'
        classNameLabel='register__label'
        type='text'
        id='username'
        name='username'
        className='auth__input'
        placeholder='Enter your username'
        value={username}
        onChange={handleInput}
        errors={errors.username}
      />
      <Input
        label='Email'
        classNameLabel='register__label'
        type='text'
        name='email'
        id='email'
        className='auth__input'
        placeholder='sample@mail.com'
        value={email}
        onChange={handleInput}
        errors={errors.email}
      />

      <Input
        label='Password'
        classNameLabel='register__label'
        type='password'
        id='password'
        name='password'
        placeholder='************'
        className='auth__input'
        value={password}
        onChange={handleInput}
        errors={errors.password}
      />

      <Input
        label='Confirm Password'
        classNameLabel='register__label'
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        className='auth__input'
        placeholder='************'
        value={confirmPassword}
        errors={errors.confirmPassword}
        onChange={handleInput}
      />
      {errors.confirmPassword && (
        <ErrorMessage error={errors.confirmPassword} />
      )}
      {/* <span id='error-message'></span> */}
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
