import React from 'react';
import { useQueryClient } from 'react-query';
import { mainAxios } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
export function DeleteUserModal({ user, setShowModal }: any) {
  const modalStyle = {
    height: '200px',
  };

  const contentStyle = {
    overflow: 'visible',
  };

  const queryClient = useQueryClient();

  const deleteUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await mainAxios.delete(`/users/${user.id}`);
      queryClient.refetchQueries('users');
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal title='Are you sure?' style={modalStyle}>
      <ModalContent style={contentStyle}>
        <div className='modal__confirm-text'>
          Are you sure you want to delete this user.
          <br /> This procces cannot be undone!
        </div>
      </ModalContent>
      <ModalFooter>
        <button
          className='modal__button--secondary'
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button className='modal__button--primary' onClick={deleteUser}>
          Delete
        </button>
      </ModalFooter>
    </Modal>
  );
}
