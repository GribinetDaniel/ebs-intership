import React from 'react';
import './index.scss';
export function PlusButton({ setShowModalAdd }: any) {
  return (
    <div className='plus' onClick={() => setShowModalAdd(true)}>
      <div className='plus__text'>+</div>
    </div>
  );
}
