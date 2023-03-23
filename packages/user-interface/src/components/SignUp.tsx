import React from 'react';
import { Link } from 'react-router-dom';

export function SignUp({
  name,
  username,
  email,
  password,
  handleInput,
  confirmPassword,
}: any) {
  return (
    <form>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        name='name'
        placeholder='Enter your name'
        value={name}
        onChange={handleInput}
      />
      <label htmlFor='username'>Username:</label>
      <input
        type='text'
        id='username'
        name='username'
        placeholder='Enter your username'
        value={username}
        onChange={handleInput}
      />
      <label htmlFor='email'>Email:</label>
      <input
        type='text'
        name='email'
        id='email'
        placeholder='sample@mail.com'
        value={email}
        onChange={handleInput}
      />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='************'
        value={password}
        onChange={handleInput}
      />
      <label htmlFor='confirmPassword'>Confirm Password:</label>
      <input
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
        <Link to='/login'> Sign In</Link>
      </p>
    </form>
  );
}
