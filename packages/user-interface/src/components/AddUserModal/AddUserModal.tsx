import React from 'react';
import { Modal, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { useQueryClient } from 'react-query';
import { mainAxios } from '../../utils';
import { ModalContent } from '../Modal';

export function AddUserModal({ setShowModal }: any) {
  const [newUser, setNewUser] = React.useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    email: '',
    permission: '',
    address: {
      city: '',
      suite: '',
      street: '',
    },
  });

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
    } catch (err: any) {
      let errs: Array<any> = [];
      const obj: any = {};
      errs = err.response.data.errors;
      errs.forEach((err) => (obj[err.param] = err.msg));
      setErrors(obj);
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
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='name'
              id='name'
              value={newUser.name}
              onChange={handleInput}
              errors={errors.name}
            />
            <Input
              label='Username'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='username'
              id='username'
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
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='password'
              id='passwword'
              value={newUser.password}
              onChange={handleInput}
              errors={errors.password}
            />
            <Input
              label='Email'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='email'
              id='email'
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
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='street'
              id='street'
              value={newUser.address.street}
              onChange={addressInput}
            />
            <Input
              label='Suite'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='suite'
              id='suite'
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
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='city'
              id='city'
              value={newUser.address.city}
              onChange={addressInput}
            />
            <Input
              label='Phone'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='phone'
              id='phone'
              value={newUser.phone}
              onChange={handleInput}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'left' }}>
            <Input
              label='Permission'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='permission'
              id='permission'
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
