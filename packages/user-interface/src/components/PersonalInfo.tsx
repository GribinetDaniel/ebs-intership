import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';
import { useQuery } from 'react-query';
import { Autocomplete, TextField } from '@mui/material';
import { useFetchCities } from '../hooks/useFetchCities';
export function PersonalInfo({
  phone,
  street,
  suite,
  handleInput,
  cityInput,
}: any) {
  const { uniqueCities } = useFetchCities();

  return (
    <div className='items'>
      <form>
        <label htmlFor='phone'>Phone:</label>
        <input
          type='text'
          name='phone'
          id='phone'
          className='input'
          placeholder='+1(XXX) XXX-XXXX'
          value={phone}
          onChange={handleInput}
        />
        <label htmlFor=''>City</label>
        <Autocomplete
          sx={{ width: '100%', height: '70px' }}
          id='combo-box-demo'
          options={uniqueCities}
          onInputChange={(event, value) => {
            cityInput(value);
          }}
          renderInput={(params) => <TextField {...params} variant='outlined' />}
        />
        <label htmlFor='street'>Street:</label>
        <input
          type='text'
          name='street'
          id='street'
          className='input'
          placeholder='M. Eminescu 5'
          value={street}
          onChange={handleInput}
        />
        <label htmlFor='suite'>Suite:</label>
        <input
          type='text'
          name='suite'
          id='suite'
          className='input'
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
