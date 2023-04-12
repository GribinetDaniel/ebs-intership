import React from 'react';

export interface ModalContentProps {
  children: React.ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
  return <div className='modal__body'>{children}</div>;
}
