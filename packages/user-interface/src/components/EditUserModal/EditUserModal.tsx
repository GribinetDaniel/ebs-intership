import React from 'react';
import { useQueryClient } from 'react-query';
import { mainAxios } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';

export function EditUserModal({ setShowModal, user }: any) {
  const [modifedUser, setModifedUser] = React.useState(user);
  const [errors, setErrors] = React.useState({
    name: '',
    username: '',
    permission: '',
    email: '',
  });

  const queryClient = useQueryClient();

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
    try {
      await mainAxios.patch(`users/${user.id}`, modifedUser);
      queryClient.refetchQueries('users');
      setShowModal(false);
    } catch (err: any) {
      console.log(err);
      let errs: Array<any> = [];
      const obj: any = {};
      errs = err.response.data.errors;
      errs.forEach((err) => (obj[err.param] = err.msg));
      setErrors(obj);
    }
  }

  return (
    <Modal title='Edit User'>
      <ModalContent>
        <form autoComplete='off'>
          <label className='modal__label'>Name</label>
          <Input
            type='text'
            className='edit-user__input'
            name='name'
            id='name'
            value={modifedUser.name}
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
            value={modifedUser.username}
            onChange={handleInput}
            errors={errors.username}
          />
          {errors.username && <ErrorMessage error={errors.username} />}

          <label className='modal__label'>Email</label>
          <Input
            type='text'
            className='edit-user__input'
            name='email'
            id='email'
            value={modifedUser.email}
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
            value={modifedUser.address.street}
            onChange={addressInput}
          />
          <label className='modal__label'>Suite</label>
          <Input
            type='text'
            className='edit-user__input'
            name='suite'
            id='suite'
            value={modifedUser.address.suite}
            onChange={addressInput}
          />
          <label className='modal__label'>City</label>
          <Input
            type='text'
            className='edit-user__input'
            name='city'
            id='city'
            value={modifedUser.address.city}
            onChange={addressInput}
          />
          <label className='modal__label'>Phone</label>
          <Input
            type='text'
            className='edit-user__input'
            name='phone'
            id='phone'
            value={modifedUser.phone}
            onChange={handleInput}
          />
          <label className='modal__label'>Permission</label>
          <Input
            type='text'
            className='edit-user__input'
            name='permission'
            id='permission'
            value={modifedUser.permission}
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
          Edit
        </button>
      </ModalFooter>
    </Modal>
  );
}
