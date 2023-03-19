import React, { useState } from 'react';
import { mainAxios } from '../utils';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/user-context';

function Register() {
  const navigate = useNavigate();
  const { isAuth, setIsAuth, user, setUser } = React.useContext(UserContext);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    permission: 'user',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const registerResponse = await mainAxios.post('/auth/register', newUser);
      localStorage.setItem('token', registerResponse.data.token);
      const accountResponse = await mainAxios.get('/account');
      setUser(accountResponse.data);
    } catch (err) {
      console.log(err);
    }
    setIsAuth(true);
    navigate('/');
  }

  return (
    // <div id='register'>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor='name'>Name:</label>
    //     <input
    //       type='text'
    //       id='name'
    //       name='name'
    //       placeholder='Enter your name'
    //       onChange={handleInput}
    //     />
    //     <label htmlFor='username'>Username:</label>
    //     <input
    //       type='text'
    //       id='username'
    //       name='username'
    //       placeholder='Enter your username'
    //       onChange={handleInput}
    //     />
    //     <label htmlFor='email'>Email:</label>
    //     <input
    //       type='text'
    //       name='email'
    //       id='email'
    //       placeholder='sample@mail.com'
    //       onChange={handleInput}
    //     />
    //     <label htmlFor='password'>Password:</label>
    //     <input
    //       type='password'
    //       id='password'
    //       name='password'
    //       placeholder='Enter your password'
    //       onChange={handleInput}
    //     />
    //     <span>Already have an account</span>
    //     <Link to='/login'>Login</Link>
    //     <input type='submit' value='Submit' />
    //   </form>
    // </div>
    <div className='register'>
      <div className='left'>
        <div className='up'>
          <div className='half-circle'></div>
        </div>
        <div className='bottom'>
          <div className='half-circle'></div>
        </div>
      </div>
      <div className='right'>
        <div className='items'>
          <div className='right-left'>
            <h2>Hello!</h2> <br />
            <p>Hello! Please enter information to create an account</p>
          </div>
          <div className='right-right'>
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                onChange={handleInput}
              />
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Enter your username'
                onChange={handleInput}
              />
              <label htmlFor='email'>Email:</label>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='sample@mail.com'
                onChange={handleInput}
              />
              <label htmlFor='password'>Password:</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='************'
                onChange={handleInput}
              />
              <p>
                Already have an account?
                <Link to='/login'> Sign In</Link>
              </p>

              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
