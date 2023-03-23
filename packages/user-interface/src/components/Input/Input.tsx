import './index.scss';
import { InputProps } from '../../types';

export function Input({
  type,
  id,
  value,
  placeholder,
  name,
  onChange,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      name={name}
      className={className}
      onChange={onChange}
    />
  );
}
