import React, { useContext } from 'react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Homepage } from './pages/Homepage';
import { Routes, Route } from 'react-router-dom';

import { UserContext } from './context/user-context';
import { UserPosts } from './pages/UserPosts';
import { Users } from './pages/Users';

export function App() {
  const { isAuth, user } = useContext(UserContext);
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path='' element={<Homepage />} />
          <Route path='/own-posts' element={<UserPosts />} />
          {user?.permission === 'admin' && (
            <Route path='/users' element={<Users />} />
          )}
          <Route path='*' element={<Navigate to='' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      )}
    </>
  );
}
