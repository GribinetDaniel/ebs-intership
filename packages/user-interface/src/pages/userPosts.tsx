import React from 'react';
import { UserContext } from '../context/user-context';
import { Post } from '../types';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import Container from 'react-bootstrap/Container';

export function UserPosts() {
  const { user, posts } = React.useContext(UserContext);
  const userPosts = posts?.filter((post: Post) => user?.id === post.userId);

  return (
    <>
      <Header />
      <Container>
        <h2>Home page</h2>
        <div className='row justify-content-center' style={{ gap: '80px' }}>
          {userPosts?.map((post: Post) => (
            <PostCard {...post} />
          ))}
        </div>
      </Container>
    </>
  );
}
