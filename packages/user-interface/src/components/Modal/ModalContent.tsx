import React from 'react';

export interface ModalContentProps {
  children: React.ReactNode;
  style?: any;
}

export function ModalContent({ children, style }: ModalContentProps) {
  return (
    <div className='modal__body' style={style}>
      {children}
    </div>
  );
}
