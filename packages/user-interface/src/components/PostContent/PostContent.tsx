import React from 'react';
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';
import { TextArea } from '../TextArea';
import { DeletePostModal } from '../DeletePostModal';
import './index.scss';

export function PostContent({
  deletePost,
  onChange,
  onSubmit,
  post,
  errors,
  action,
}: any) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className='edit-post'>
      <div className='edit-post__items'>
        <form>
          <label className='edit-post__label'>Title</label>
          <Input
            value={post.title}
            className='post__input'
            onChange={onChange}
            name='title'
            errors={errors.title}
          />
          <label className='edit-post__label'>Body</label>
          <TextArea
            name='body'
            error={errors.body}
            value={post.body}
            className='textarea'
            onChange={onChange}
          />
          {errors.body && <ErrorMessage error={errors.body} />}
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
