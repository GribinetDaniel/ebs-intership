import React from "react";
import { InputForm } from "../Input";
import { TextAreaForm } from "../TextArea";
import { DeletePostModal } from "../DeletePostModal";
import { Post } from "../../types";
import { useForm, SubmitHandler } from "react-hook-form";

import "./index.scss";
import { Button } from "../Button";

interface PostErrors {
 title: string;
 body: string;
}

interface PostContentProps {
 onSubmit: SubmitHandler<Post>;
 post: Post;
 serverErrors: PostErrors;
 action: string;
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
  formState: { errors },
 } = useForm<Post>({ defaultValues: post });

 React.useEffect(() => {
  if (post.id) {
   let defaultValues = post;
   reset({ ...defaultValues });
  }
 }, [post.id]);

 return (
  <div className="edit-post">
   <div className="edit-post__items">
    <form>
     <label className="edit-post__label">Title</label>
     <InputForm
      name="title"
      register={register}
      required
      error={errors.title}
      errorMessage="Title is required"
     />
     <label className="edit-post__label">Body</label>
     <TextAreaForm
      name="body"
      register={register}
      error={errors.body}
      errorMessage="Body is required"
      required
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
     <Button
      type="primary"
      style={{ marginLeft: "auto", width: "100px" }}
      onClick={handleSubmit(onSubmit)}
      disabled={disabled}
     >
      {action}
     </Button>
    </div>
   </div>
   {showModal && <DeletePostModal onClose={() => setShowModal(false)} />}
  </div>
 );
}
