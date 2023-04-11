import React from 'react';
import './index.scss';

export interface PlusButtonProps {
  onClick?: () => void;
}

export function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <div className='plus' onClick={onClick}>
      <div className='plus__text'>+</div>
    </div>
  );
}
