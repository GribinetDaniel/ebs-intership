import React from 'react';
import './index.scss';
export function ErrorPage() {
  return (
    <div className='error-page'>
      <img
        className='error-page--image'
        src={require('./images/error-image.jpg')}
      />
    </div>
  );
}
