import React from 'react';
export function ErrorPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={require('./images/error-image.jpg')} height='700px' />
    </div>
  );
}
