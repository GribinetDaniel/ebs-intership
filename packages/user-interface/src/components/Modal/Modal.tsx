import React from 'react';
import './index.scss';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClickOutside: () => void;
}

export function Modal({ children, title, onClickOutside }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal__backdrop' onClick={onClickOutside}></div>
      <div className='modal__content'>
        <div className='modal__header'>{title}</div>
        {children}
      </div>
    </div>
  );
}
