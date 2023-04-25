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
import { UserImage } from '../UserImage';

export function Header() {
  const { user, setUser, setIsAuth } = React.useContext(UserContext);

  function logout() {
    setUser(undefined);
    setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <div className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__list-item'>
          <Link to={'/settings'} className='navbar__link navbar__link--logo'>
            <UserImage style={{ backgroundColor: user?.userImage }} />
            <span className='navbar__text--logo'>{user?.username}</span>
          </Link>
        </li>
        <li className='navbar__list-item'>
          <Link to={'/own-posts'} className='navbar__link'>
            <FontAwesomeIcon icon={faUser} className='navbar__icon' />
            <span className='navbar__text'>My Posts</span>
          </Link>
        </li>
        <li className='navbar__list-item'>
          <Link to={'/'} className='navbar__link'>
            <FontAwesomeIcon
              icon={faUsers}
              size='xl'
              className='navbar__icon'
            />
            <span className='navbar__text'>All Posts</span>
          </Link>
        </li>
        <li className='navbar__list-item'>
          <Link to='/settings' className='navbar__link'>
            <FontAwesomeIcon
              icon={faGears}
              size='xl'
              className='navbar__icon'
            />
            <span className='navbar__text'>Settings</span>
          </Link>{' '}
        </li>
        {user?.permission === 'admin' && (
          <li className='navbar__list-item'>
            <Link to='/users' className='navbar__link'>
              <FontAwesomeIcon
                icon={faUserGroup}
                size='xl'
                className='navbar__icon'
              />
              <span className='navbar__text'>Users</span>
            </Link>
          </li>
        )}
        <li className='navbar__list-item navbar__logout'>
          <Link to='/login' onClick={logout} className='navbar__link'>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size='xl'
              className='navbar__icon'
            />
            <span className='navbar__text'>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
