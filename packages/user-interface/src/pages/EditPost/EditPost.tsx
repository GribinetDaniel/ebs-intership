import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { ErrorPage } from '../../components/ErrorPage';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { mainAxios } from '../../utils';
import { Input } from '../../components/Input';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { ConfirmModal } from '../../components/ConfirmModal';

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

  const [showModal, setShowModal] = React.useState(false);

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
    } catch (err) {
      console.log(err);
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
          <div className='edit-post'>
            <div className='edit-post__items'>
              <form>
                <label className='edit-post__label'>Title</label>
                <Input
                  // defaultValue={post.title}
                  value={post.title}
                  className='post__input'
                  onChange={handleInput}
                  name='title'
                />
                <label className='edit-post__label'>Body</label>
                <textarea
                  name='body'
                  id='body'
                  value={post.body}
                  className='edit-post__textarea'
                  onChange={handleInput}
                ></textarea>
              </form>
              <div className='edit-post__button'>
                <button
                  className='edit-post__button--secondary'
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
                <button
                  className='edit-post__button--primary'
                  onClick={handleSubmit}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <ConfirmModal deletePost={deletePost} setShowModal={setShowModal} />
          )}
        </div>
      )}
    </>
  );
}
