import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
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

  const deleteMutaion = useMutation({
    mutationFn: (userId: number) => {
      return mainAxios.delete(`/users/${userId}`);
    },
  });

  const deleteUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    deleteMutaion.mutate(user.id!, {
      onSuccess: () => {
        queryClient.refetchQueries('users');
        setShowModal(false);
      },
      onError: (err) => {
        console.log(err);
      },
    });
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
        <Button
          text='Delete'
          type='primary'
          onClick={deleteUser}
          disabled={deleteMutaion.isLoading}
        />
      </ModalFooter>
    </Modal>
  );
}
