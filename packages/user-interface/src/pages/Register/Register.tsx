import React, { useState } from 'react';
import { catchAxiosError, mainAxios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { SignUp } from '../../components/SignUp';
import { PersonalInfo } from '../../components/PersonalInfo';
import { defaultUser, User } from '../../types';
import { isAxiosError } from 'axios';
import { Button } from '../../components/Button';
import { useMutation } from 'react-query';
import './index.scss';

export function Register() {
 const navigate = useNavigate();
 const { setIsAuth, setUser } = React.useContext(UserContext);
 const [newUser, setNewUser] = useState<User>(defaultUser);
 const [errors, setErrors] = useState({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
 });

 const { currentStep, setCurrentStep, next, back } = useMultistepForm();

 const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({ ...newUser, [event.target.name]: event.target.value });
 };

 const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewUser({
   ...newUser,
   address: {
    ...newUser.address,
    [event.target.name]: event.target.value,
   },
  });
 };

  const registerMutation = useMutation({
    mutationFn: (newUser: User) => {
      return mainAxios.post('/auth/register', newUser);
    },
  });

  const accountMutation = useMutation({
    mutationFn: (data1: any) => {
      return mainAxios.get('/account');
    },
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
      registerMutation.mutate(newUser, {
        onSuccess(data1) {
          localStorage.setItem('token', data1.data.token);
          accountMutation.mutate(data1, {
            onSuccess(data) {
              setUser(data.data);
              setIsAuth(true);
              navigate('/');
            },
            onError(err) {
              console.log(err);
            },
          });
        },
        onError(err) {
          if (isAxiosError(err)) {
            const obj = catchAxiosError(err);
            setErrors(obj);
            if (obj.username || obj.name || obj.email || obj.password)
              setCurrentStep(0);
          } else console.log(err);
        },
      });
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
                <Button
                  type='secondary'
                  text='Back'
                  onClick={back}
                  style={{ padding: '10px 20px', margin: '20px 0px' }}
                />
              )}
              <Button
                type='primary'
                text={currentStep === 0 ? 'Next' : 'Sign Up'}
                onClick={handleSubmit}
                style={{ padding: '10px 20px', margin: '20px 0px' }}
                disabled={
                  registerMutation.isLoading || accountMutation.isLoading
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="register__bottom-half">
     <div className="half-circle"></div>
    </div>
   </div>
   <div className="register__right-part">
    <div className="register__items">
     <div className="register__right-left-part">
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
     <div className="register__right-right-part">
      <div className="register__progress-bar">
       {currentStep === 0 ? (
        <div className="register__progress-done" style={{ width: "55%" }}></div>
       ) : (
        <div
         className="register__progress-done"
         style={{ width: "100%" }}
        ></div>
       )}
      </div>
      {currentStep === 0 && (
       <SignUp user={newUser} handleInput={handleInput} errors={errors} />
      )}
      {currentStep === 1 && (
       <PersonalInfo
        user={newUser}
        handleInput={handleInput}
        setValue={(value: string) =>
         setNewUser({
          ...newUser,
          address: {
           ...newUser.address,
           city: value,
          },
         })
        }
        addressInput={addressInput}
       />
      )}
      <div className="register__button">
       {currentStep === 1 && (
        <Button
         type="secondary"
         onClick={back}
         style={{
          padding: "10px 20px",
          margin: "20px 0px",
         }}
        >
         Back
        </Button>
       )}
       <Button
        type="primary"
        onClick={handleSubmit}
        style={{
         padding: "10px 20px",
         margin: "20px 0px",
        }}
       >
        {currentStep === 0 ? "Next" : "Sign Up"}
       </Button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
