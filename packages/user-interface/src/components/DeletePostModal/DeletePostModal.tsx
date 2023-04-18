import React from 'react';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';

interface DeletePostModalProps {
  deletePost?: (e: React.SyntheticEvent) => void;
  setShowModal: (arg: boolean) => void;
}

export function DeletePostModal({
  deletePost,
  setShowModal,
}: DeletePostModalProps) {
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
        <Button type='secondary' onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button type='primary' onClick={deletePost}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}
