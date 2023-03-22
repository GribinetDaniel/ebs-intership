import React, { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/register';
import Homepage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './context/user-context';
import { UserPosts } from './pages/UserPosts';
import { Users } from './pages/Users';

function App() {
  const { isAuth, user } = useContext(UserContext);
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/own-posts' element={<UserPosts />} />
          {user?.permission === 'admin' && (
            <Route path='/users' element={<Users />} />
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
