import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ErrorPage } from '../../components/ErrorPage';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { mainAxios } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { PostContent } from '../../components/PostContent';
import { defaultPost, Post } from '../../types';

export function EditPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const path = window.location.pathname;

  const patchMutation = useMutation({
    mutationFn: (post: Post) => {
      return mainAxios.patch(`${path}`, post);
    },
  });

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
  const [post, setPost] = React.useState<Post>(defaultPost);

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
    patchMutation.mutate(post, {
      onSuccess: () => {
        queryClient.refetchQueries('posts');
        navigate('/own-posts');
      },

      onError: (error: any) => {
        let errs: Array<{ msg: string; param: string }> = [];
        const obj: any = {};
        errs = error!.response!.data.errors;
        errs.forEach((err) => (obj[err.param] = err.msg));
        setErrors(obj);
      },
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {data && (
        <div className='content'>
          <Header />
          <PostContent
            onChange={handleInput}
            onSubmit={handleSubmit}
            post={post}
            errors={errors}
            action='edit'
            disabled={patchMutation.isLoading}
          />
        </div>
      )}
    </>
  );
}
