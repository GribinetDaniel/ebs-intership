import React from 'react';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { DeletePostModal } from '../DeletePostModal';
import { Post } from '../../types';

import './index.scss';
import { Button } from '../Button';

interface PostErrors {
  title: string;
  body: string;
}

interface PostContentProps {
  deletePost?: (e: React.SyntheticEvent) => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit?: (e: React.SyntheticEvent) => void;
  post: Post;

  disabled: boolean;
  errors?: PostErrors;
  action?: 'view' | 'edit' | 'create';
}

export function PostContent({
  onChange,
  onSubmit,
  post,
  errors,
  action,
  disabled,
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
            errors={errors?.title}
            disabled={action === 'view'}
          />
          <label className='edit-post__label'>Body</label>
          <TextArea
            name='body'
            error={errors?.body}
            value={post.body}
            onChange={onChange}
            disabled={action === 'view'}
          />
        </form>
        <div className='edit-post__button'>
          {action === 'edit' && (
            <Button
              text='Delete'
              type='secondary'
              style={{ width: '100px' }}
              onClick={() => setShowModal(true)}
            />
          )}
          {action !== 'view' && (
            <button className='edit-post__button--primary' onClick={onSubmit}>
              {action}
            </button>
          )}
        </div>
      </div>
      {showModal && <DeletePostModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
