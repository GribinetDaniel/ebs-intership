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
        <Input
          label='Phone'
          classNameLabel='register__label'
          type='text'
          name='phone'
          id='phone'
          className='auth__input'
          placeholder='+1(XXX) XXX-XXXX'
          value={phone}
          onChange={handleInput}
        />
        <label className='register__label'>City</label>
        <Autocomplete
          className='auth__input'
          cityInput={cityInput}
          placeholder='Chisinau'
        />

        <Input
          label='Street'
          classNameLabel='register__label'
          type='text'
          name='street'
          id='street'
          className='auth__input'
          placeholder='M. Eminescu 5'
          value={street}
          onChange={addressInput}
        />
        <Input
          label='Suite'
          classNameLabel='register__label'
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
