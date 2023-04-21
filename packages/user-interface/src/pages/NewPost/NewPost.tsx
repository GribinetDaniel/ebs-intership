import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { PostContent } from '../../components/PostContent';
import { UserContext } from '../../context/user-context';
import { defaultPost, Post } from '../../types';
import { mainAxios } from '../../utils';
import { isAxiosError } from 'axios';

export function NewPost() {
  const { user } = React.useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<Post>(defaultPost);

  const createMutation = useMutation({
    mutationFn: (post: Post) => {
      return mainAxios.post('/posts', post);
    },
  });

  React.useEffect(() => {
    if (user) setPost({ ...post, userId: user.id! });
  }, [user]);

  const [errors, setErrors] = React.useState({
    title: '',
    body: '',
  });

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    createMutation.mutate(post, {
      onSuccess: () => {
        queryClient.refetchQueries('posts');
        navigate('/own-posts');
      },
      onError: (err) => {
        if (isAxiosError(err)) {
          let errs: Array<{ msg: string; param: string }> = [];
          const obj: any = {};
          errs = err!.response!.data.errors;
          errs.forEach((err) => (obj[err.param] = err.msg));
          setErrors(obj);
        } else console.log(err);
      },
    });
  }
  return (
    <div className='content'>
      <Header />
      <PostContent
        post={post}
        errors={errors}
        onChange={handleInput}
        onSubmit={handleSubmit}
        action='create'
        disabled={createMutation.isLoading}
      />
    </div>
  );
}
