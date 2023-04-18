import React from 'react';
import { useQueryClient } from 'react-query';
import { User } from '../../types';
import { mainAxios } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';

interface DeleteUserModalProps {
  user: User;
  setShowModal: (arg: boolean) => void;
}

export function DeleteUserModal({ user, setShowModal }: DeleteUserModalProps) {
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
    <Modal title='Are you sure?'>
      <ModalContent>
        <div className='modal__confirm-text'>
          Are you sure you want to delete this user.
          <br /> This procces cannot be undone!
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          text='Close'
          type='secondary'
          onClick={() => setShowModal(false)}
        />
        <Button text='Delete' type='primary' onClick={deleteUser} />
      </ModalFooter>
    </Modal>
  );
}
