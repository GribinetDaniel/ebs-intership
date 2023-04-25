import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { mainAxios, catchAxiosError } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { User } from '../../types';
import { Button } from '../Button';
import { isAxiosError } from 'axios';

export interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

export function EditUserModal({ onClose, user }: EditUserModalProps) {
  const [modifedUser, setModifedUser] = React.useState(user);
  const [errors, setErrors] = React.useState({
    name: '',
    username: '',
    permission: '',
    email: '',
  });

  const queryClient = useQueryClient();

  const patchMutation = useMutation({
    mutationFn: (modifedUser: User) => {
      return mainAxios.patch(`users/${user.id}`, modifedUser);
    },
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifedUser({ ...modifedUser, [event.target.name]: event.target.value });
  };

  const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModifedUser({
      ...modifedUser,
      address: {
        ...modifedUser.address,
        [event.target.name]: event.target.value,
      },
    });
  };

  function handleSubmit() {
    patchMutation.mutate(modifedUser, {
      onSuccess: () => {
        queryClient.refetchQueries('users');
        onClose();
      },
      onError: (err) => {
        if (isAxiosError(err)) setErrors(catchAxiosError(err));
        else console.log(err);
      },
    });
  }

  return (
    <Modal title='Edit User' onClickOutside={onClose}>
      <ModalContent>
        <form autoComplete='off'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '30px',
            }}
          >
            <Input
              label='Name'
              type='text'
              name='name'
              value={modifedUser.name}
              onChange={handleInput}
              errors={errors.name}
            />
            <Input
              label='Username'
              type='text'
              name='username'
              value={modifedUser.username}
              onChange={handleInput}
              errors={errors.username}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '30px',
            }}
          >
            <Input
              label='Email'
              type='text'
              name='email'
              value={modifedUser.email}
              onChange={handleInput}
              errors={errors.email}
            />
            <Input
              label='Street'
              type='text'
              name='street'
              value={modifedUser.address.street}
              onChange={addressInput}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '30px',
            }}
          >
            <Input
              label='Suite'
              type='text'
              name='suite'
              value={modifedUser.address.suite}
              onChange={addressInput}
            />
            <Input
              label='City'
              type='text'
              name='city'
              value={modifedUser.address.city}
              onChange={addressInput}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '30px',
            }}
          >
            <Input
              label='Phone'
              type='text'
              name='phone'
              value={modifedUser.phone}
              onChange={handleInput}
            />
            <Input
              label='Permission'
              type='text'
              name='permission'
              value={modifedUser.permission}
              onChange={handleInput}
              errors={errors.permission}
            />
          </div>
        </form>
      </ModalContent>
      <ModalFooter>
        <Button type='secondary' text='Close' onClick={onClose} />
        <Button
          type='primary'
          text='Edit'
          onClick={handleSubmit}
          disabled={patchMutation.isLoading}
        />
      </ModalFooter>
    </Modal>
  );
}
