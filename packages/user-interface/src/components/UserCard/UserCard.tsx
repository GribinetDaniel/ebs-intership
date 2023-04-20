import React from 'react';
import { User } from '../../types';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

interface UserCardProps {
  user: User;
  setShowModalEdit: (arg: boolean) => void;
  setShowModalDelete: (arg: boolean) => void;
  setSelectedUser: (arg: User) => void;
}

export function UserCard({
  user,
  setShowModalEdit,
  setSelectedUser,
  setShowModalDelete,
}: UserCardProps) {
  return (
    <div className='col-md-3'>
      <div className='user-card'>
        <div className='user-card__header'>
          {user.name}
          <div className='user-card__icons'>
            <FontAwesomeIcon
              className='user-card__icon'
              icon={faTrashCan}
              style={{ color: '#C21807', cursor: 'pointer' }}
              onClick={() => {
                setShowModalDelete(true);
                setSelectedUser(user);
              }}
            />
            <FontAwesomeIcon
              className='user-card__icon'
              icon={faUserPen}
              style={{ color: '#7e56da', cursor: 'pointer' }}
              onClick={() => {
                setShowModalEdit(true);
                setSelectedUser(user);
              }}
            />
          </div>
        </div>
        <div className='user-card__body'>
          <div className='user-card__row'>
            <span className='user-card__label'>Username: </span>
            <span className='user-card__info'>{user.username}</span>
          </div>
          <div className='user-card__row'>
            <span className='user-card__label'>Phone: </span>
            <span className='user-card__info'>{user.phone}</span>
          </div>
          <div className='user-card__row'>
            <span className='user-card__label'>Email: </span>
            <span className='user-card__info'>{user.email}</span>
          </div>
          <div className='user-card__row'>
            <span className='user-card__label'>City: </span>
            <span className='user-card__info'>{user.address.city}</span>
          </div>
          <div className='user-card__row'>
            <span className='user-card__label'>Permission: </span>
            <span className='user-card__info'>{user.permission}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
