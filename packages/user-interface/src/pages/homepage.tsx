import React from 'react';
import { Post } from '../types';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import Container from 'react-bootstrap/Container';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage';

function Homepage() {
  const { data, isLoading, error } = useQuery('posts', () => {
    return mainAxios.get('/posts');
  });

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {data && (
        <>
          <Header />
          <Container>
            <h2>Home page</h2>
            <div className='row justify-content-center' style={{ gap: '80px' }}>
              {data?.data.map((post: Post) => (
                <PostCard {...post} />
              ))}
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default Homepage;
