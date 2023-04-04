import React, { useState } from 'react';
import { mainAxios } from '../utils';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { useMultistepForm } from '../hooks/useMultistepForm';
import { SignUp } from '../components/SignUp';
import { PersonalInfo } from '../components/PersonalInfo';

function Register() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = React.useContext(UserContext);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    permission: 'user',
    city: '',
    street: '',
    suite: '',
    phone: '',
  });

  const { currentStep, next, back } = useMultistepForm();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const cityInput = (value: string) => {
    setNewUser({ ...newUser, city: value });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (currentStep === 0) next();
    else {
      try {
        const registerResponse = await mainAxios.post(
          '/auth/register',
          newUser
        );
        localStorage.setItem('token', registerResponse.data.token);
        const accountResponse = await mainAxios.get('/account');
        setUser(accountResponse.data);
        setIsAuth(true);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
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
            {currentStep === 0 ? (
              <>
                <h2>Hello!</h2>
                <p>Hi! Please enter information to create an account</p>
              </>
            ) : (
              <>
                <h2>Adress</h2>
                <p>Enter some additional information about you</p>
              </>
            )}
          </div>
          <div className='right-right'>
            <div className='progress-bar'>
              {currentStep === 0 ? (
                <div className='progress-done' style={{ width: '55%' }}></div>
              ) : (
                <div className='progress-done' style={{ width: '100%' }}></div>
              )}
            </div>
            {currentStep === 0 && (
              <SignUp {...newUser} handleInput={handleInput} />
            )}
            {currentStep === 1 && (
              <PersonalInfo
                {...newUser}
                handleInput={handleInput}
                cityInput={cityInput}
              />
            )}
            <div className='buttons'>
              {currentStep === 1 && (
                <button className='button--secondary' onClick={back}>
                  Back
                </button>
              )}
              <button className='button--primary' onClick={handleSubmit}>
                {currentStep === 0 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
