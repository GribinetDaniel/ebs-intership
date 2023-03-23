import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Register/index.scss';

export function SignUp({ name, username, email, password, handleInput }: any) {
  return (
    <form className='register__form'>
      <label htmlFor='name' className='register__label'>
        Name:
      </label>
      <input
        type='text'
        id='name'
        name='name'
        placeholder='Enter your name'
        className='register__input'
        value={name}
        onChange={handleInput}
      />
      <label htmlFor='username' className='register__label'>
        Username:
      </label>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='Enter your username'
        className='register__input'
        value={username}
        onChange={handleInput}
      />
      <label htmlFor='email' className='register__label'>
        Email:
      </label>
      <input
        type='text'
        name='email'
        id='email'
        placeholder='sample@mail.com'
        className='register__input'
        value={email}
        onChange={handleInput}
      />
      <label htmlFor='password' className='register__label'>
        Password:
      </label>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='************'
        className='register__input'
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
