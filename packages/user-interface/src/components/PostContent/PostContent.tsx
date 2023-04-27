import React from "react";
import { Input, InputForm } from "../Input";
import { TextAreaForm } from "../TextArea";
import { DeletePostModal } from "../DeletePostModal";
import { Post } from "../../types";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";
import { Button } from "../Button";

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

 console.log(watch("tags"));

 return (
  <div className="edit-post">
   <div className="edit-post__items">
    <form autoComplete="off" style={{ paddingBottom: "40px" }}>
     <label className="edit-post__label">Title</label>
     <InputForm
      name="title"
      register={register}
      required
      error={errors.title}
      errorMessage="Title is required"
      disabled={action === "view"}
     />
     <div className="d-flex gap-3 flex-wrap" style={{ marginTop: "10px" }}>
      {fields.map((_, index) => {
       return (
        <>
         {action === "view" ? (
          <p>Danu</p>
         ) : (
          <>
           <div className="position-relative">
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
             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(`tags.${index}.color`, e.target.value)
             }
            />
            <InputForm
             register={register}
             name={`tags.${index}.name`}
             style={{
              backgroundColor: getValues(`tags.${index}.color`),
              width: "150px",
              height: "30px",
              fontWeight: "bold",
              color: "#fff",
              paddingLeft: "35px",
              borderRadius: "100px",
              outline: "none",
             }}
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
     <label className="edit-post__label">Body</label>
     <TextAreaForm
      name="body"
      register={register}
      error={errors.body}
      errorMessage="Body is required"
      required
      disabled={action === "view"}
     />
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
