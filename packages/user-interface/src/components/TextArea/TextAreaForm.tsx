import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { Post } from "../../types";
import { ErrorMessage } from "../ErrorMessage";
import "./index.scss";

interface TextAreaFormProps {
 register: UseFormRegister<Post>;
 required: boolean;
 error: FieldError | undefined;
 name: Path<Post>;
 errorMessage: string;
 disabled?: boolean;
}

export function TextAreaForm({
 register,
 required,
 error,
 errorMessage,
 name,
 disabled,
}: TextAreaFormProps) {
 let className = "textarea";
 error && (className += " error");
 return (
  <div>
   <textarea
    {...register(name, { required })}
    className={className}
    disabled={disabled}
   ></textarea>
   {error && <ErrorMessage error={errorMessage} />}
  </div>
 );
}
