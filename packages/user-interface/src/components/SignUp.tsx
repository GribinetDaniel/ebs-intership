import React from 'react';
import { Link } from 'react-router-dom';

export function SignUp({ name, username, email, password, handleInput }: any) {
  return (
    <form>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        name='name'
        className='input'
        placeholder='Enter your name'
        value={name}
        onChange={handleInput}
      />
      <label htmlFor='username'>Username:</label>
      <input
        type='text'
        id='username'
        name='username'
        className='input'
        placeholder='Enter your username'
        value={username}
        onChange={handleInput}
      />
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        name='email'
        id='email'
        className='input'
        placeholder='sample@mail.com'
        value={email}
        onChange={handleInput}
      />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        id='password'
        name='password'
        className='input'
        placeholder='************'
        value={password}
        onChange={handleInput}
      />
      <p>
        Already have an account?
        <Link to='/login'> Sign In</Link>
      </p>
    </form>
  );
}
