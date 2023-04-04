import './index.scss';

export interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
}

export function Input({
  type,
  id,
  value,
  placeholder,
  name,
  onChange,
  className,
  errors,
}: InputProps) {
  errors && (className += ' auth__input--error');
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
