import React from 'react';

export interface ModalFooterProps {
  children: React.ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className='modal__button'>{children}</div>;
}
