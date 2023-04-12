import React from 'react';

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className='modal__button'>{children}</div>;
}
