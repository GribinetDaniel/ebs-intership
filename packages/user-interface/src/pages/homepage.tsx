import { Post } from '../types';
import { Header } from '../components/Header';
import { PostCard } from '../components/PostCard';
import { useQuery } from 'react-query';
import { mainAxios } from '../utils';
import { Loading } from '../components/Loading';
import { ErrorPage } from '../components/ErrorPage';

function Homepage() {
  const { data, isLoading, error } = useQuery('posts', () => {
    return mainAxios.get('/posts');
  });
  const posts = data?.data;
  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {data && (
        <div className='content'>
          <Header />
          <div className='home-page'>
            <h2>{posts.length} posts</h2>
            <div className='row justify-content-center' style={{ gap: '80px' }}>
              {data?.data.map((post: Post) => (
                <PostCard {...post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
