import React from 'react';
import { Modal, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';
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
          <label className='modal__label'>Name</label>
          <Input
            type='text'
            className='edit-user__input'
            name='name'
            id='name'
            value={newUser.name}
            onChange={handleInput}
            errors={errors.name}
          />
          {errors.name && <ErrorMessage error={errors.name} />}
          <label className='modal__label'>Username</label>
          <Input
            type='text'
            className='edit-user__input'
            name='username'
            id='username'
            value={newUser.username}
            onChange={handleInput}
            errors={errors.username}
          />
          {errors.username && <ErrorMessage error={errors.username} />}

          <label className='modal__label'>Password</label>
          <Input
            type='text'
            className='edit-user__input'
            name='password'
            id='passwword'
            value={newUser.password}
            onChange={handleInput}
            errors={errors.password}
          />
          {errors.username && <ErrorMessage error={errors.password} />}

          <label className='modal__label'>Email</label>
          <Input
            type='text'
            className='edit-user__input'
            name='email'
            id='email'
            value={newUser.email}
            onChange={handleInput}
            errors={errors.email}
          />
          {errors.email && <ErrorMessage error={errors.email} />}

          <label className='modal__label'>Street</label>
          <Input
            type='text'
            className='edit-user__input'
            name='street'
            id='street'
            value={newUser.address.street}
            onChange={addressInput}
          />
          <label className='modal__label'>Suite</label>
          <Input
            type='text'
            className='edit-user__input'
            name='suite'
            id='suite'
            value={newUser.address.suite}
            onChange={addressInput}
          />
          <label className='modal__label'>City</label>
          <Input
            type='text'
            className='edit-user__input'
            name='city'
            id='city'
            value={newUser.address.city}
            onChange={addressInput}
          />
          <label className='modal__label'>Phone</label>
          <Input
            type='text'
            className='edit-user__input'
            name='phone'
            id='phone'
            value={newUser.phone}
            onChange={handleInput}
          />
          <label className='modal__label'>Permission</label>
          <Input
            type='text'
            className='edit-user__input'
            name='permission'
            id='permission'
            value={newUser.permission}
            onChange={handleInput}
            errors={errors.permission}
          />
          {errors.permission && <ErrorMessage error={errors.permission} />}
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
