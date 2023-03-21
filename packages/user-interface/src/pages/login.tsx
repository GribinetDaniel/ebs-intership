import React, { useState, useContext } from 'react';
import { mainAxios } from '../utils/main-axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';

function Login() {
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
      <div className='left'>
        <div className='items'>
          <h2>Welcome back</h2>
          <p>Welcome back! Please enter our details</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              value={newUser.username}
              onChange={handleInput}
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='********'
              value={newUser.password}
              onChange={handleInput}
            />
            <input type='submit' value='Sign In' />
            <p className='subtitle'>
              Don't have an account? <Link to={'/register'}>Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
      <div className='right'>
        <div className='up'>
          <div className='half-circle'></div>
        </div>
        <div className='down'>
          <div className='half-circle'></div>
        </div>
      </div>
    </div>
  );
}
export default Login;
