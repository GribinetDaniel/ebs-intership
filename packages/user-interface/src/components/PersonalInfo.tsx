import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

export function PersonalInfo({ phone, city, street, suite, handleInput }: any) {
  return (
    <div className='items'>
      <form>
        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          name='phone'
          id='phone'
          placeholder='+1(XXX) XXX-XXXX'
          value={phone}
          onChange={handleInput}
        />
        <label htmlFor='city'>City:</label>
        <input
          type='text'
          name='city'
          id='city'
          placeholder='Chisinau'
          value={city}
          onChange={handleInput}
        />
        <label htmlFor='street'>Street:</label>
        <input
          type='text'
          name='street'
          id='street'
          placeholder='M. Eminescu 5'
          value={street}
          onChange={handleInput}
        />
        <label htmlFor='suite'>Suite:</label>
        <input
          type='text'
          name='suite'
          id='suite'
          placeholder='Apt.48'
          value={suite}
          onChange={handleInput}
        />
        <p>
          Already have an account?
          <Link to='/login'> Sign In</Link>
        </p>
      </form>
    </div>
  );
}
