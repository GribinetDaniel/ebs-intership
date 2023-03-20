import React from 'react';
import { UserContext } from '../context/user-context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGears,
  faUser,
  faUsers,
  faRightFromBracket,
  faUserGroup,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
export function Header() {
  const { user, setUser, isAuth, setIsAuth } = React.useContext(UserContext);

  function logout() {
    setUser(undefined);
    setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <div className='navbar'>
      <ul>
        <li>
          <FontAwesomeIcon icon={faUser} size='xl' />
          <Link to='/own-posts'>My Posts</Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} size='xl' />
          <Link to='/'>All Posts</Link>
        </li>
        {user?.permission === 'admin' && (
          <li>
            <FontAwesomeIcon icon={faUserGroup} size='xl' />
            <Link to='/users'>Users</Link>
          </li>
        )}
        <li>
          <FontAwesomeIcon icon={faGears} size='xl' />
          <Link to='/account'>Settings</Link>{' '}
        </li>
        <li>
          <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
          <Link to='/login' onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
