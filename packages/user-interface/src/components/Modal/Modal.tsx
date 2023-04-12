import React from 'react';
import './index.scss';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export function Modal({ children, title }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal__content'>
        <div className='modal__header'>{title}</div>
        {children}
      </div>
    </div>
  );
}
