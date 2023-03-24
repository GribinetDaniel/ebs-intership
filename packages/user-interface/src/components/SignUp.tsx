import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';

export function SignUp({
  name,
  username,
  email,
  password,
  handleInput,
  confirmPassword,
}: any) {
  return (
    <form className='register__form'>
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
      />
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
      />
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
      />
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
      />
      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <Input
        type='password'
        id='confirmPassword'
        name='confirmPassword'
        placeholder='************'
        value={confirmPassword}
        onChange={handleInput}
      />
      <span id='error-message'></span>
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
