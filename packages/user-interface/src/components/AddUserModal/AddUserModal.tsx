import React from 'react';
import { Modal, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { useQueryClient } from 'react-query';
import { mainAxios } from '../../utils';
import { ModalContent } from '../Modal';
import { isAxiosError } from 'axios';
import { defaultUser, User } from '../../types';

export interface AddUserModalProps {
  setShowModal: (arg0: boolean) => void;
}

export function AddUserModal({ setShowModal }: AddUserModalProps) {
  const [newUser, setNewUser] = React.useState<User>(defaultUser);

  const [errors, setErrors] = React.useState({
    name: '',
    username: '',
    permission: '',
    email: '',
    password: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const addressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      address: {
        ...newUser.address,
        [event.target.name]: event.target.value,
      },
    });
  };

  const queryClient = useQueryClient();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      await mainAxios.post('/users', newUser);
      setShowModal(false);
      queryClient.refetchQueries('users');
    } catch (err) {
      if (isAxiosError(err)) {
        let errs: Array<any> = [];
        const obj: any = {};
        errs = err!.response!.data.errors;
        errs.forEach((err) => (obj[err.param] = err.msg));
        setErrors(obj);
      } else console.log(err);
    }
  }

  return (
    <Modal title='Create new User'>
      <ModalContent>
        <form autoComplete='off'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Input
              label='Name'
              type='text'
              name='name'
              value={newUser.name}
              onChange={handleInput}
              errors={errors.name}
            />
            <Input
              label='Username'
              type='text'
              name='username'
              value={newUser.username}
              onChange={handleInput}
              errors={errors.username}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Input
              label='Password'
              type='text'
              name='password'
              value={newUser.password}
              onChange={handleInput}
              errors={errors.password}
            />
            <Input
              label='Email'
              type='text'
              name='email'
              value={newUser.email}
              onChange={handleInput}
              errors={errors.email}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Input
              label='Street'
              type='text'
              name='street'
              value={newUser.address.street}
              onChange={addressInput}
            />
            <Input
              label='Suite'
              type='text'
              name='suite'
              value={newUser.address.suite}
              onChange={addressInput}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Input
              label='City'
              type='text'
              name='city'
              value={newUser.address.city}
              onChange={addressInput}
            />
            <Input
              label='Phone'
              type='text'
              name='phone'
              value={newUser.phone}
              onChange={handleInput}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
            <Input
              label='Permission'
              type='text'
              name='permission'
              value={newUser.permission}
              onChange={handleInput}
              errors={errors.permission}
            />
          </div>
        </form>
      </ModalContent>
      <ModalFooter>
        <button
          className='modal__button--secondary'
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button className='modal__button--primary' onClick={handleSubmit}>
          Create
        </button>
      </ModalFooter>
    </Modal>
  );
}
