import React from 'react';
import { Header } from '../components/Header';
import { Container } from 'react-bootstrap';
import { User } from '../types';
import { UserCard } from '../components/UserCard';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';

export function Users() {
  const { isLoading, error, data } = useQuery('users', () => {
    return mainAxios.get('/users');
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
                <UserCard {...user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
