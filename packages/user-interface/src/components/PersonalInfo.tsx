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
        <Input
          type='text'
          name='phone'
          id='phone'
          className='auth__input'
          placeholder='+1(XXX) XXX-XXXX'
          value={phone}
          onChange={handleInput}
        />
        <label htmlFor=''>City</label>
        <Autocomplete className='auth__input' cityInput={cityInput} />

        <label htmlFor='street'>Street:</label>
        <Input
          type='text'
          name='street'
          id='street'
          className='auth__input'
          placeholder='M. Eminescu 5'
          value={street}
          onChange={addressInput}
        />
        <label htmlFor='suite'>Suite:</label>
        <Input
          type='text'
          name='suite'
          id='suite'
          className='auth__input'
          placeholder='Apt.48'
          value={suite}
          onChange={addressInput}
        />
        <p>
          Already have an account?
          <Link to='/login' className='register__link'>
            {' '}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
