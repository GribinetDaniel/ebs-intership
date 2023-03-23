export interface InputProps {
  type?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
