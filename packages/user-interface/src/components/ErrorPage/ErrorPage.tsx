import React from 'react';
import errImg from './images/error-image.jpg';
import './index.scss';
export function ErrorPage() {
  return (
    <div className='error-page'>
      <img className='error-page__image' src={errImg} alt='Error' />
    </div>
  );
}
