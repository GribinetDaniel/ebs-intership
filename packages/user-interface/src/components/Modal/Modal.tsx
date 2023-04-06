import React from 'react';
import { mainAxios } from '../../utils';
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';
import './index.scss';

export function Modal({
  setShowModal,
  name,
  username,
  email,
  address,
  phone,
  permission,
  id,
  refetch,
}: any) {
  const [modifedUser, setModifedUser] = React.useState({
    name,
    username,
    email,
    address,
    phone,
    permission,
    id,
  });

  const [errors, setErrors] = React.useState({
    name: '',
    username: '',
    permission: '',
    email: '',
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
    try {
      console.log(id);
      await mainAxios.patch(`/users/${id}`, modifedUser);
      setShowModal(false);
      refetch();
    } catch (err: any) {
      let errs: Array<any> = [];
      const obj: any = {};
      errs = err.response.data.errors;
      errs.forEach((err) => (obj[err.param] = err.msg));
      setErrors(obj);
    }
  }

  return (
    <div className='modal'>
      <div className='modal__content'>
        <div className='modal__header'>Edit User</div>
        <div className='modal__body'>
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
        </div>
        <div className='modal__button'>
          <button
            className='modal__button--secondary'
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className='modal__button--primary' onClick={handleSubmit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
