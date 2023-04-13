import React, { useState } from 'react';
import { mainAxios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SignUp } from '../../components/SignUp';
import { PersonalInfo } from '../../components/PersonalInfo';
import { defaultUser, User } from '../../types';
import { isAxiosError } from 'axios';
import './index.scss';

export function Register() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = React.useContext(UserContext);
  const [newUser, setNewUser] = useState<User>(defaultUser);
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { currentStep, setCurrentStep, next, back } = useMultistepForm();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const cityInput = (value: string) => {
    setNewUser({ ...newUser, address: { ...newUser.address, city: value } });
  };

  const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      address: { ...newUser.address, [event.target.name]: event.target.value },
    });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (currentStep === 0) {
      if (newUser.password === newUser.confirmPassword) next();
      else {
        setNewUser({ ...newUser, confirmPassword: '' });
        setErrors({ ...errors, confirmPassword: "Password didn't match" });
      }
    } else {
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
        if (isAxiosError(err)) {
          let errs: Array<{ msg: string; param: string }> = [];
          const obj: any = {};
          errs = err!.response!.data.errors;
          errs.forEach((err) => (obj[err.param] = err.msg));
          setErrors(obj);
          if (obj.username || obj.name || obj.email || obj.password)
            setCurrentStep(0);
        } else console.log(err);
      }
    }
  }

  return (
    <div className='register'>
      <div className='register__left-part'>
        <div className='register__upper-half'>
          <div className='half-circle'></div>
        </div>
        <div className='register__bottom-half'>
          <div className='half-circle'></div>
        </div>
      </div>
      <div className='register__right-part'>
        <div className='register__items'>
          <div className='register__right-left-part'>
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
          <div className='register__right-right-part'>
            <div className='register__progress-bar'>
              {currentStep === 0 ? (
                <div
                  className='register__progress-done'
                  style={{ width: '55%' }}
                ></div>
              ) : (
                <div
                  className='register__progress-done'
                  style={{ width: '100%' }}
                ></div>
              )}
            </div>
            {currentStep === 0 && (
              <SignUp
                user={newUser}
                handleInput={handleInput}
                errors={errors}
              />
            )}
            {currentStep === 1 && (
              <PersonalInfo
                user={newUser}
                handleInput={handleInput}
                cityInput={cityInput}
                addressInput={addressInput}
              />
            )}
            <div className='register__button'>
              {currentStep === 1 && (
                <button className='register__button--secondary' onClick={back}>
                  Back
                </button>
              )}
              <button
                className='register__button--primary'
                onClick={handleSubmit}
              >
                {currentStep === 0 ? 'Next' : 'Sign Up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
