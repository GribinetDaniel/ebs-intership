import React, { useState, useContext } from 'react';
import { mainAxios } from '../../utils/main-axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import './index.scss';

export function Login() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, user, setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const loginResponse = await mainAxios.post('/auth/login', newUser);
      localStorage.setItem('token', loginResponse.data.token);
      const accountResponse = await mainAxios.get('/account');
      setUser(accountResponse.data);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      console.log(err);
      setNewUser({
        username: '',
        password: '',
      });
    }
  }

  return (
    <div className='login'>
      <div className='login__left-part'>
        <div>
          <h2>Welcome back</h2>
          <p className='login__text'>Welcome back! Please enter our details</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className='login__label'>
              Username:
            </label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              className='login__input'
              value={newUser.username}
              onChange={handleInput}
            />
            <label htmlFor='password' className='login__label'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='********'
              className='login__input'
              value={newUser.password}
              onChange={handleInput}
            />
            <input
              type='submit'
              value='Sign In'
              className='login__input--submit'
            />
            <p className='subtitle'>
              Don't have an account?{' '}
              <Link to={'/register'} className='login__link'>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className='login__right-part'>
        <div className='login__upper-half'>
          <div className='login__upper-half--half-circle'></div>
        </div>
        <div className='login__down-half'>
          <div className='login__down-half--half-circle'></div>
        </div>
      </div>
    </div>
  );
}
