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
import { Draggable } from "react-beautiful-dnd";
import "./index.scss";

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
  <Draggable
   key={getValues(`tags.${index}.name`)}
   draggableId={getValues(`tags.${index}.name`)}
   index={index}
  >
   {(provided: any, snapshot: any) => (
    <div
     className="position-relative d-flex draggable"
     ref={provided.innerRef}
     {...provided.draggableProps}
     {...provided.dragHandleProps}
    >
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
     />
     <div className="tag__delete-icon" onClick={() => remove(index)}>
      <FontAwesomeIcon icon={faX} size="xs" />
     </div>
     {provided.placeholder}
    </div>
   )}
  </Draggable>
 );
}
