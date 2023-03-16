import React, { createContext, useState, useContext } from 'react';
import Login from './pages/login'
import  Register  from './pages/register';
import Homepage from './pages/homepage';
import {Routes, Route} from 'react-router-dom';
import { UserContext } from './context/myContext';
import Container from 'react-bootstrap/Container'

function App() {
  const {isAuth, setIsAuth, user} = useContext(UserContext)
  return(
    // <Container>
    <>
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
    {/* </Container> */}
    </>
  )
}

export default App;
