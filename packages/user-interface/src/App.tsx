import React, { createContext, useState, useContext } from 'react';
import Login from './pages/login'
import  Register  from './pages/register';
import Homepage from './pages/homepage';
import {Routes, Route} from 'react-router-dom';
import { UserContext } from './context/myContext';

function App() {
  const {isAuth, setIsAuth, user} = useContext(UserContext)
  return(
    <div className='container'>
    {isAuth ? (
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    ) : (
      <Routes>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
      </Routes>
    )}
    </div>
  )
}

export default App;
