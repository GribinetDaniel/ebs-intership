import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 UseFieldArrayRemove,
 UseFormGetValues,
 UseFormRegister,
 UseFormSetValue,
} from "react-hook-form";
import { Post } from "../../types";
import { InputForm } from "../Input";

interface EditTagProps {
 index: number;
 register: UseFormRegister<Post>;
 remove: UseFieldArrayRemove;
 getValues: UseFormGetValues<Post>;
 setValue: UseFormSetValue<Post>;
 onTagChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EditTag({
 index,
 register,
 remove,
 getValues,
 setValue,
 onTagChange,
}: EditTagProps) {
 return (
  <div className="position-relative">
   <input
    {...register(`tags.${index}.color`)}
    type="color"
    onChange={e => setValue(`tags.${index}.color`, e.target.value)}
    className="tag__input--color"
   />
   <input
    {...register(`tags.${index}.name`)}
    className="tag__input"
    onChange={onTagChange}
    style={{ backgroundColor: getValues(`tags.${index}.color`) }}
   />
   <div className="edit-post__delete-tag-icon" onClick={() => remove(index)}>
    <FontAwesomeIcon icon={faX} size="xs" />
   </div>
  </div>
 );
}
