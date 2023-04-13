import React from 'react';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { DeletePostModal } from '../DeletePostModal';
import { Post } from '../../types';
import './index.scss';

interface PostErrors {
  title: string;
  body: string;
}

interface PostContentProps {
  deletePost?: (e: React.SyntheticEvent) => void;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  post: Post;
  errors: PostErrors;
  action: string;
}

export function PostContent({
  deletePost,
  onChange,
  onSubmit,
  post,
  errors,
  action,
}: PostContentProps) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className='edit-post'>
      <div className='edit-post__items'>
        <form>
          <label className='edit-post__label'>Title</label>
          <Input
            value={post.title}
            onChange={onChange}
            name='title'
            errors={errors.title}
          />
          <label className='edit-post__label'>Body</label>
          <TextArea
            name='body'
            error={errors.body}
            value={post.body}
            onChange={onChange}
          />
        </form>
        <div className='edit-post__button'>
          {action === 'edit' && (
            <button
              className='edit-post__button--secondary'
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          )}
          <button className='edit-post__button--primary' onClick={onSubmit}>
            {action}
          </button>
        </div>
      </div>
      {showModal && (
        <DeletePostModal setShowModal={setShowModal} deletePost={deletePost} />
      )}
    </div>
  );
}
