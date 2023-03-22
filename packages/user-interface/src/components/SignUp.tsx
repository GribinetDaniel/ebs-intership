import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';

export function SignUp({ name, username, email, password, handleInput }: any) {
  return (
    <form className='register__form'>
      <label htmlFor='name' className='register__label'>
        Name:
      </label>
      <Input
        type='text'
        id='name'
        name='name'
        className='input'
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
        className='input'
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
        className='input'
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
        className='input'
        placeholder='************'
        className='auth__input'
        value={password}
        onChange={handleInput}
      />
      <p className='register__text'>
        Already have an account?
        <Link to='/login' className='register__link'>
          {' '}
          Sign In
        </Link>
      </p>
    </form>
  );
}
