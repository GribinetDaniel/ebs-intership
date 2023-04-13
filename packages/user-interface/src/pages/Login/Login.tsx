import React, { useState, useContext } from 'react';
import { mainAxios } from '../../utils/main-axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { Input } from '../../components/Input';
import { isAxiosError } from 'axios';
import './index.scss';

export function Login() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useContext(UserContext);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
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
      if (isAxiosError(err)) {
        const errs = err!.response!.data;
        setErrors({ ...errors, [errs.param]: errs.msg });
      } else console.log(err);
      setNewUser({ ...newUser, password: '' });
    }
  }
  console.log(errors);
  return (
    <div className='login'>
      <div className='login__left-part'>
        <div>
          <h2>Welcome back</h2>
          <p className='login__text'>Welcome back! Please enter our details</p>
          <form onSubmit={handleSubmit}>
            <Input
              label='Username'
              type='text'
              name='username'
              placeholder='Enter your username'
              value={newUser.username}
              onChange={handleInput}
              errors={errors.username}
            />
            <Input
              label='Password'
              type='password'
              name='password'
              placeholder='********'
              value={newUser.password}
              onChange={handleInput}
              errors={errors.password}
            />
            <button className='register__button--primary'>Sign in</button>
            <p>
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
