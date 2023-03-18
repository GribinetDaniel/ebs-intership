import React from 'react';
import '../index.css';
export function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className='lds-dual-ring'></div>
    </div>
  );
}
