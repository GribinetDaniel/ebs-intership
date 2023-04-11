import React from 'react';
import { mainAxios } from '../../utils';
import { Input } from '../Input';
import { ErrorMessage } from '../ErrorMessage';
import './index.scss';
import { useQueryClient } from 'react-query';

export function Modal({
  setShowModal,
  setSelectedUser,
  name,
  username,
  email,
  address,
  phone,
  permission,
  id,
  action,
}: any) {
  const [modifedUser, setModifedUser] = React.useState({
    name,
    username,
    email,
    address,
    phone,
    permission,
    id,
    password: '',
  });

  const [errors, setErrors] = React.useState({
    name: '',
    username: '',
    permission: '',
    email: '',
    password: '',
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

  const queryClient = useQueryClient();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      if (action === 'edit') await mainAxios.patch(`/users/${id}`, modifedUser);
      else if (action === 'create') await mainAxios.post('/users', modifedUser);
      else await mainAxios.delete(`/users/${id}`);
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
  const contentClassName = `modal__content--${action}`;
  const bodyClassName =
    action === 'delete' ? 'modal__body--delete' : 'modal__body';
  return (
    <div className='modal'>
      <div className={contentClassName}>
        {action === 'delete' ? (
          <div className='modal__header'>Are you sure?</div>
        ) : (
          <div className='modal__header'>{action} user</div>
        )}
        <div className={bodyClassName}>
          {(action === 'create' || action === 'edit') && (
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
              {action === 'create' && (
                <>
                  <label className='modal__label'>Password</label>
                  <Input
                    type='text'
                    className='edit-user__input'
                    name='password'
                    id='passwword'
                    value={modifedUser.password}
                    onChange={handleInput}
                    errors={errors.password}
                  />
                  {errors.username && <ErrorMessage error={errors.password} />}
                </>
              )}
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
          )}
          {action === 'delete' && (
            <div className='modal__confirm-text'>
              Do you really want to delete this user? <br />
              This procces cannot be undone!
            </div>
          )}
        </div>
        <div className='modal__button'>
          <button
            className='modal__button--secondary'
            onClick={() => {
              setShowModal(false);
              setSelectedUser({
                name: '',
                username: '',
                email: '',
                phone: '',
                password: '',
                permission: '',
                address: {
                  street: '',
                  suite: '',
                  city: '',
                },
              });
            }}
          >
            Close
          </button>
          <button className='modal__button--primary' onClick={handleSubmit}>
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
