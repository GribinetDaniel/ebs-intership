import './index.scss';

interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
