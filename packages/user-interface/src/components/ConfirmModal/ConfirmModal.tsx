import React from 'react';
import './index.scss';

export function ConfirmModal({ setShowModal, deletePost }: any) {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <div className='modal__body'>
          Do you really want to delete this post? <br />
          This procces cannot be undone!
        </div>
        <div className='modal__button'>
          <button
            className='modal__button--secondary'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className='modal__button--primary' onClick={deletePost}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
