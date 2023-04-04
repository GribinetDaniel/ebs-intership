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
      <label htmlFor='name' className='register__label'>
        Name:
      </label>
      <Input
        type='text'
        id='name'
        name='name'
        placeholder='Enter your name'
        className='auth__input'
        value={name}
        onChange={handleInput}
        errors={errors.name}
      />
      {errors.name && <ErrorMessage error={errors.name} />}
      <label htmlFor='username' className='register__label'>
        Username:
      </label>
      <Input
        type='text'
        id='username'
        name='username'
        placeholder='Enter your username'
        className='auth__input'
        value={username}
        onChange={handleInput}
        errors={errors.username}
      />
      {errors.username && <ErrorMessage error={errors.username} />}

      <label htmlFor='email' className='register__label'>
        Email:
      </label>
      <Input
        type='text'
        name='email'
        id='email'
        placeholder='sample@mail.com'
        className='auth__input'
        value={email}
        onChange={handleInput}
        errors={errors.email}
      />
      {errors.email && <ErrorMessage error={errors.email} />}

      <label htmlFor='password' className='register__label'>
        Password:
      </label>
      <Input
        type='password'
        id='password'
        name='password'
        placeholder='************'
        className='auth__input'
        value={password}
        onChange={handleInput}
        errors={errors.password}
      />
      {errors.password && <ErrorMessage error={errors.password} />}

      <label htmlFor='confirmPassword' className='register__label'>
        Confirm Password:
      </label>
      <Input
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
