import { Link } from 'react-router-dom';
import { Input } from './Input';
import '../pages/Register/index.scss';

import { Autocomplete } from './Autocomplete';
export function PersonalInfo({
  phone,
  street,
  suite,
  handleInput,
  cityInput,
  addressInput,
}: any) {
  return (
    <div className='items'>
      <form autoComplete='off'>
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
        <Autocomplete className='input' cityInput={cityInput} />

        <label htmlFor='street'>Street:</label>
        <input
          type='text'
          name='street'
          id='street'
          className='input'
          placeholder='M. Eminescu 5'
          value={street}
          onChange={addressInput}
        />
        <label htmlFor='suite'>Suite:</label>
        <input
          type='text'
          name='suite'
          id='suite'
          className='input'
          placeholder='Apt.48'
          value={suite}
          onChange={addressInput}
        />
        <p>
          Already have an account?
          <Link to='/login'> Sign In</Link>
        </p>
      </form>
    </div>
  );
}
