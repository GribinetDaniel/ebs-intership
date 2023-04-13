import React from 'react';
import { Header } from '../components/Header';
import { User, defaultUser } from '../types';
import { UserCard } from '../components/UserCard';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { PlusButton } from '../components/PlusButton';
import { AddUserModal } from '../components/AddUserModal';
import { EditUserModal } from '../components/EditUserModal';
import { DeleteUserModal } from '../components/DeleteUserModal';

export function Users() {
  const { isLoading, error, data } = useQuery('users', () => {
    return mainAxios.get('/users');
  });

  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [showModalAdd, setShowModalAdd] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User>(defaultUser);

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
                  setShowModalEdit={setShowModalEdit}
                  setShowModalDelete={setShowModalDelete}
                  setSelectedUser={setSelectedUser}
                />
              ))}
            </div>
          </div>
          {showModalEdit && (
            <EditUserModal
              setShowModal={setShowModalEdit}
              user={selectedUser}
            />
          )}
          <PlusButton onClick={() => setShowModalAdd(true)} />
          {showModalAdd && <AddUserModal setShowModal={setShowModalAdd} />}

          {showModalDelete && (
            <DeleteUserModal
              user={selectedUser}
              setShowModal={setShowModalDelete}
            />
          )}
        </div>
      )}
    </>
  );
}
