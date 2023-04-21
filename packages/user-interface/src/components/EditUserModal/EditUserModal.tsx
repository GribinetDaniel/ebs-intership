import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { mainAxios } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { User } from '../../types';
import { Button } from '../Button';

export interface EditUserModalProps {
  user: User;
  setShowModal: (arg: boolean) => void;
}

export function EditUserModal({ setShowModal, user }: EditUserModalProps) {
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

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    patchMutation.mutate(modifedUser, {
      onSuccess: () => {
        queryClient.refetchQueries('users');
        setShowModal(false);
      },
      onError: (err: any) => {
        console.log(err);
        let errs: Array<any> = [];
        const obj: any = {};
        errs = err.response.data.errors;
        errs.forEach((err) => (obj[err.param] = err.msg));
        setErrors(obj);
      },
    });
  }

  return (
    <Modal title='Edit User'>
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
        <Button
          type='secondary'
          text='Close'
          onClick={() => setShowModal(false)}
        />
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
