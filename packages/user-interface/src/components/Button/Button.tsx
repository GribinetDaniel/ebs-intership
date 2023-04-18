import React from 'react';
import './index.scss';
interface ButtonProps {
  type: string;
  style?: any;
  onClick?: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
}

export function Button({ type, onClick, style, children }: ButtonProps) {
  let className = 'button';
  if (type) className += ` button--${type}`;
  return (
    <button className={className} style={style} onClick={onClick}>
      {children}
    </button>
  );
}
