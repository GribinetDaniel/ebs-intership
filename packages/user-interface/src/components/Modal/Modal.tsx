import React from 'react';
import './index.scss';

export interface ModalProps {
  title: string;
  children: React.ReactNode;
  style?: any;
}

export function Modal({ children, title, style }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal__content' style={style}>
        <div className='modal__header'>{title}</div>
        {children}
      </div>
    </div>
  );
}
