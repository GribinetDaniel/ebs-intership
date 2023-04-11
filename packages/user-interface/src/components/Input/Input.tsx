import './index.scss';

export interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
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
  defaultValue,
  placeholder,
  name,
  onChange,
  className,
  errors,
}: InputProps) {
  errors && (className += ' error');
  return (
    <input
      type={type}
      id={id}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
      className={className}
      onChange={onChange}
    />
  );
}
