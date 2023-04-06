import React from 'react';
import { Header } from '../components/Header';
import { User } from '../types';
import { UserCard } from '../components/UserCard';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Modal } from '../components/Modal';
import { PlusButton } from '../components/PlusButton';

export function Users() {
  const { isLoading, error, data } = useQuery('users', () => {
    return mainAxios.get('/users');
  });

  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModalAdd, setShowModalAdd] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    permission: '',
    address: {
      street: '',
      suite: '',
      city: '',
    },
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {data && (
        <div className='content'>
          <Header />
          <div className='home-page'>
            <h2>Users</h2>
            <div className='row justify-content-center' style={{ gap: '80px' }}>
              {data?.data.map((user: User) => (
                <UserCard
                  user={user}
                  setShowModal={setShowModalEdit}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </div>
          </div>
          {showModalEdit && (
            <Modal
              {...selectedUser}
              setShowModal={setShowModalEdit}
              setSelectedUser={setSelectedUser}
              action='Edit'
            />
          )}
          <PlusButton setShowModalAdd={setShowModalAdd} />
          {showModalAdd && (
            <Modal
              {...selectedUser}
              setSelectedUser={setSelectedUser}
              setShowModal={setShowModalAdd}
              action='Add'
            />
          )}
        </div>
      )}
    </>
  );
}
