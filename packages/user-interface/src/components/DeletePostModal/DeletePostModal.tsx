import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../Modal';
export function DeletePostModal({ deletePost, setShowModal }: any) {
  return (
    <Modal title='Are you sure?'>
      <ModalContent>
        <div className='modal__confirm-text'>
          Do you really want to delete this post?
          <br />
          This procces can not be undone!
        </div>
      </ModalContent>
      <ModalFooter>
        <button
          className='modal__button--secondary'
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button className='modal__button--primary' onClick={deletePost}>
          Delete
        </button>
      </ModalFooter>
    </Modal>
  );
}
