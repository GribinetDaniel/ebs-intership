import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ErrorPage } from '../../components/ErrorPage';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { mainAxios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { PostContent } from '../../components/PostContent';
export function EditPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const path = window.location.pathname;
  const { isLoading, error, data } = useQuery(
    `edit-post`,
    () => {
      return mainAxios.get(`${path}`);
    },
    {
      onSuccess: (data) => {
        setPost(data.data);
      },
    }
  );
  const [post, setPost] = React.useState({
    title: '',
    body: '',
    userId: '',
    id: '',
  });

  const [errors, setErrors] = React.useState({
    title: '',
    body: '',
  });

  const handleInput = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await mainAxios.patch(`${path}`, post);
      queryClient.refetchQueries('posts');
      navigate('/');
    } catch (err: any) {
      console.log(err);
      let errs: Array<any> = [];
      const obj: any = {};
      errs = err.response.data.errors;
      errs.forEach((err) => (obj[err.param] = err.msg));
      setErrors(obj);
    }
  };

  const deletePost = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await mainAxios.delete(`${path}`);
      queryClient.refetchQueries('posts');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {data && (
        <div className='content'>
          <Header />
          <PostContent
            deletePost={deletePost}
            onChange={handleInput}
            onSubmit={handleSubmit}
            post={post}
            errors={errors}
            action='edit'
          />
        </div>
      )}
    </>
  );
}
