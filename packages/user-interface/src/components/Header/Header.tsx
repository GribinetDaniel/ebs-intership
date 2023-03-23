import React from 'react';
import { UserContext } from '../../context/user-context';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGears,
  faUser,
  faUsers,
  faRightFromBracket,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';
export function Header() {
  const { user, setUser, isAuth, setIsAuth } = React.useContext(UserContext);

  function logout() {
    setUser(undefined);
    setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <div className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__list-item'>
          <FontAwesomeIcon icon={faUser} size='xl' className='navbar__icon' />
          <Link to='/own-posts' className='navbar__text'>
            My Posts
          </Link>
        </li>
        <li className='navbar__list-item'>
          <FontAwesomeIcon icon={faUsers} size='xl' className='navbar__icon' />
          <Link to='/' className='navbar__text'>
            All Posts
          </Link>
        </li>
        {user?.permission === 'admin' && (
          <li className='navbar__list-item'>
            <FontAwesomeIcon
              icon={faUserGroup}
              size='xl'
              className='navbar__icon'
            />
            <Link to='/users' className='navbar__text'>
              Users
            </Link>
          </li>
        )}
        <li className='navbar__list-item'>
          <FontAwesomeIcon icon={faGears} size='xl' className='navbar__icon' />
          <Link to='/account' className='navbar__text'>
            Settings
          </Link>{' '}
        </li>
        <li className='navbar__list-item'>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            size='xl'
            className='navbar__icon'
          />
          <Link to='/login' onClick={logout} className='navbar__text'>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
