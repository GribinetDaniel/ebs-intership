import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ErrorPage } from "../../components/ErrorPage";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { mainAxios, catchAxiosError } from "../../utils";
import { useNavigate } from "react-router-dom";
import { PostContent } from "../../components/PostContent";
import { defaultPost, Post } from "../../types";
import { isAxiosError } from "axios";

export function EditPost() {
 const navigate = useNavigate();
 const queryClient = useQueryClient();
 let path = window.location.pathname;
 path = path.replace("/edit", "");
 const patchMutation = useMutation({
  mutationFn: (post: Post) => {
   return mainAxios.patch(`${path}`, post);
  },
 });

 const { isLoading, error, data } = useQuery(
  `${path}`,
  () => {
   return mainAxios.get(`${path}`);
  },
  {
   onSuccess: data => {
    setPost(data.data);
   },
  }
 );
 const [post, setPost] = React.useState<Post>(defaultPost);

 const [errors, setErrors] = React.useState({
  title: "",
  body: "",
 });

 const onSubmit = (data: Post) => {
  patchMutation.mutate(data, {
   onSuccess: () => {
    queryClient.refetchQueries("posts");
    navigate("/own-posts");
   },

   onError: error => {
    if (isAxiosError(error)) setErrors(catchAxiosError(error));
    else console.log(error);
   },
  });
 };

 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />
     <PostContent
      onSubmit={onSubmit}
      post={post}
      serverErrors={errors}
      action="edit"
      disabled={patchMutation.isLoading}
     />
    </div>
   )}
  </>
 );
}
