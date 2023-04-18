import React from 'react';
import { useQueryClient } from 'react-query';
import { mainAxios } from '../../utils';
import { Modal, ModalContent, ModalFooter } from '../Modal';
import { Input } from '../Input';

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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              label='Name'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='name'
              id='name'
              value={modifedUser.name}
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
              value={modifedUser.username}
              onChange={handleInput}
              errors={errors.username}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              label='Email'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='email'
              id='email'
              value={modifedUser.email}
              onChange={handleInput}
              errors={errors.email}
            />
            <Input
              label='Street'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='street'
              id='street'
              value={modifedUser.address.street}
              onChange={addressInput}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              label='Suite'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='suite'
              id='suite'
              value={modifedUser.address.suite}
              onChange={addressInput}
            />
            <Input
              label='City'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='city'
              id='city'
              value={modifedUser.address.city}
              onChange={addressInput}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Input
              label='Phone'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='phone'
              id='phone'
              value={modifedUser.phone}
              onChange={handleInput}
            />
            <Input
              label='Permission'
              classNameLabel='modal__label'
              type='text'
              className='edit-user__input'
              name='permission'
              id='permission'
              value={modifedUser.permission}
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
          Edit
        </button>
      </ModalFooter>
    </Modal>
  );
}
