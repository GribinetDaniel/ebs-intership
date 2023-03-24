import React, { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import './index.scss';
import '../Header/index.scss';

export function UserImage() {
  const { user } = useContext(UserContext);
  return <div className='user-image navbar__link'>{user?.username[0]}</div>;
}
