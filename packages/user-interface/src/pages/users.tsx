import React from 'react';
import { Header } from '../components/Header';
import { User } from '../types';
import { UserCard } from '../components/UserCard';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Modal } from '../components/Modal';

export function Users() {
  const { isLoading, error, data, refetch } = useQuery('users', () => {
    return mainAxios.get('/users');
  });

  const [showModal, setShowModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});

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
                  setShowModal={setShowModal}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </div>
          </div>
          {showModal && (
            <Modal
              {...selectedUser}
              setShowModal={setShowModal}
              refetch={refetch}
            />
          )}
        </div>
      )}
    </>
  );
}
