import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';

export function PersonalInfo({ phone, city, street, suite, handleInput }: any) {
  return (
    <form className='register__form'>
      <label htmlFor='phone' className='register__label'>
        Phone:
      </label>
      <Input
        type='text'
        name='phone'
        id='phone'
        placeholder='+1(XXX) XXX-XXXX'
        className='auth__input'
        value={phone}
        onChange={handleInput}
      />
      <label htmlFor='city' className='register__label'>
        City:
      </label>
      <Input
        type='text'
        name='city'
        id='city'
        placeholder='Chisinau'
        className='auth__input'
        value={city}
        onChange={handleInput}
      />
      <label htmlFor='street' className='register__label'>
        Street:
      </label>
      <Input
        type='text'
        name='street'
        id='street'
        placeholder='M. Eminescu 5'
        className='auth__input'
        value={street}
        onChange={handleInput}
      />
      <label htmlFor='suite' className='register__label'>
        Suite:
      </label>
      <Input
        type='text'
        name='suite'
        id='suite'
        placeholder='Apt.48'
        className='auth__input'
        value={suite}
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
