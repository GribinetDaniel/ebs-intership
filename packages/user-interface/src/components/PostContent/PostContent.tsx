import React from "react";
import { InputForm } from "../Input";
import { TextAreaForm } from "../TextArea";
import { DeletePostModal } from "../DeletePostModal";
import { Post } from "../../types";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";
import { Button } from "../Button";
import { Tag } from "../Tag";

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

 const { fields, append, remove } = useFieldArray({ control, name: "tags" });

 React.useEffect(() => {
  if (post.id) {
   let defaultValues = post;
   reset({ ...defaultValues });
  }
 }, [post.id]);

 const onTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.style.width = 7 + e.target.value.length + "ch";
 };

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
       />
      </>
     )}
     <div className="d-flex gap-3 flex-wrap" style={{ marginTop: "10px" }}>
      {fields.map((_, index) => {
       return (
        <>
         {action === "view" ? (
          <Tag
           name={getValues(`tags.${index}.name`)}
           color={getValues(`tags.${index}.color`)}
          />
         ) : (
          <>
           <div className="position-relative" key={index}>
            <InputForm
             register={register}
             name={`tags.${index}.color`}
             type="color"
             style={{
              position: "absolute",
              left: "0",
              width: "30px",
              height: "30px",
              bottom: "0px",
              borderRadius: "100%",
             }}
             onChange={e => setValue(`tags.${index}.color`, e.target.value)}
            />
            <InputForm
             register={register}
             name={`tags.${index}.name`}
             style={{
              backgroundColor: getValues(`tags.${index}.color`),
              width: "100px",
              height: "30px",
              fontWeight: "bold",
              color: "#fff",
              paddingRight: "25px",
              paddingLeft: "35px",
              borderRadius: "100px",
              outline: "none",
             }}
             onChange={onTagChange}
            />
            <div
             className="edit-post__delete-tag-icon"
             onClick={() => remove(index)}
            >
             <FontAwesomeIcon icon={faX} size="xs" />
            </div>
           </div>
          </>
         )}
        </>
       );
      })}
     </div>
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
       style={{ width: "100px" }}
       onClick={() => setShowModal(true)}
      >
       Delete
      </Button>
     )}
     {action !== "view" && onSubmit && (
      <div>
       <Button
        type="primary"
        onClick={() => append({ name: "", color: "#2270C3" })}
        style={{ margin: "0 20px 0 0", width: "100px", padding: "10px" }}
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
