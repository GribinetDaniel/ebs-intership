import React from "react";
import { faX, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 UseFieldArrayRemove,
 UseFormGetValues,
 UseFormRegister,
 UseFormSetValue,
} from "react-hook-form";
import { Post } from "../../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./index.scss";

interface EditTagProps {
 index: number;
 register: UseFormRegister<Post>;
 remove: UseFieldArrayRemove;
 getValues: UseFormGetValues<Post>;
 setValue: UseFormSetValue<Post>;
 onTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 name: string;
 style?: any;
}

export function EditTag({
 index,
 register,
 remove,
 getValues,
 setValue,
 onTagChange,
 name,
 style,
}: EditTagProps) {
 const {
  attributes,
  isDragging,
  listeners,
  setNodeRef,
  transform,
  transition,
 } = useSortable({
  id: name,
 });

 const styles = {
  transform: CSS.Transform.toString(transform),
  transition,

  ...style,
 };

 return (
  <div className="position-relative d-flex draggable" style={styles}>
   <div
    className="tag__draggable-icon"
    ref={setNodeRef}
    {...attributes}
    {...listeners}
   >
    <FontAwesomeIcon icon={faGripVertical} />
   </div>
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
    style={{
     backgroundColor: getValues(`tags.${index}.color`),
     width: 7 + getValues(`tags.${index}.name`).length + "ch",
    }}
    maxLength={15}
   />
   <div className="tag__delete-icon" onClick={() => remove(index)}>
    <FontAwesomeIcon icon={faX} size="xs" />
   </div>
  </div>
 );
}
