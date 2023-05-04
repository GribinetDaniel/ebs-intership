import React from "react";
import { InputForm } from "../Input";
import { TextAreaForm } from "../TextArea";
import { DeletePostModal } from "../DeletePostModal";
import { Post } from "../../types";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import "./index.scss";
import { Button } from "../Button";
import { Tag, EditTag } from "../Tag";
import {
 DndContext,
 closestCenter,
 MouseSensor,
 TouchSensor,
 useSensor,
 useSensors,
 DragOverlay,
} from "@dnd-kit/core";
import {
 SortableContext,
 horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface PostErrors {
 title: string;
 body: string;
}

interface PostContentProps {
 onSubmit?: SubmitHandler<Post>;
 post: Post;
 serverErrors?: PostErrors;
 action: "create" | "view" | "edit";
 disabled?: boolean;
}

export function PostContent({
 onSubmit,
 post,
 action,
 disabled,
}: PostContentProps) {
 const [showModal, setShowModal] = React.useState(false);
 const {
  register,
  handleSubmit,
  reset,
  control,
  watch,
  getValues,
  setValue,
  formState: { errors },
 } = useForm<Post>({ defaultValues: post });

 const { fields, append, remove, move } = useFieldArray({
  control,
  name: "tags",
 });

 React.useEffect(() => {
  if (post.id) {
   let defaultValues = post;
   reset({ ...defaultValues });
  }
 }, [post.id]);

 const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.style.width = 7 + e.target.value.length + "ch";
 };

 const addTag = () => {
  if (fields.length === 4) return;
  else append({ name: "", color: "#2270C3", id: fields.length });
 };

 function handleDragStart(event: any) {
  setActiveId(event.active.id);
 }

 function handleDragEnd(event: any) {
  const { active, over } = event;

  if (active.id !== over.id) {
   move(active.id, over.id);
  }

  setActiveId(-1);
 }

 const [activeId, setActiveId] = React.useState(1);
 const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

 watch("tags");

 return (
  <div className="edit-post">
   <div className="edit-post__items">
    <form autoComplete="off" style={{ paddingBottom: "40px" }}>
     {action === "view" ? (
      <h2 className="edit-post__title">{getValues("title")}</h2>
     ) : (
      <>
       <label className="edit-post__label">Title</label>
       <InputForm
        name="title"
        register={register}
        required
        error={errors.title}
        errorMessage="Title is required"
        maxLength={42}
       />
      </>
     )}
     <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
     >
      <SortableContext items={fields} strategy={horizontalListSortingStrategy}>
       <div className="d-flex flex-wrap gap-3 droppable">
        {fields.map((_, index) => {
         return (
          <>
           {action === "view" ? (
            <Tag
             name={getValues(`tags.${index}.name`)}
             color={getValues(`tags.${index}.color`)}
            />
           ) : (
            <EditTag
             name={index.toLocaleString()}
             index={index}
             register={register}
             remove={remove}
             getValues={getValues}
             setValue={setValue}
             onTagChange={onTagChange}
            />
           )}
          </>
         );
        })}
       </div>
      </SortableContext>
      <DragOverlay>
       {activeId > -1 ? (
        <EditTag
         name={activeId.toLocaleString()}
         index={activeId}
         register={register}
         remove={remove}
         getValues={getValues}
         setValue={setValue}
         onTagChange={onTagChange}
         style={{ opacity: "0.2" }}
        />
       ) : null}
      </DragOverlay>
     </DndContext>

     {action === "view" ? (
      <p className="edit-post__body">{getValues("body")}</p>
     ) : (
      <>
       <label className="edit-post__label">Body</label>
       <TextAreaForm
        name="body"
        register={register}
        error={errors.body}
        errorMessage="Body is required"
        required
       />
      </>
     )}
    </form>
    <div className="edit-post__button">
     {action === "edit" && (
      <Button
       type="secondary"
       className="edit-post__button--secondary"
       onClick={() => setShowModal(true)}
      >
       Delete
      </Button>
     )}
     {action !== "view" && onSubmit && (
      <div>
       <Button
        type="primary"
        onClick={addTag}
        style={{ margin: "0 20px 10px 0", width: "100px", padding: "10px" }}
       >
        Add a tag
       </Button>
       <Button
        type="primary"
        style={{ marginLeft: "auto", width: "100px" }}
        onClick={handleSubmit(onSubmit)}
        disabled={disabled}
       >
        {action}
       </Button>
      </div>
     )}
    </div>
   </div>
   {showModal && <DeletePostModal onClose={() => setShowModal(false)} />}
  </div>
 );
}
