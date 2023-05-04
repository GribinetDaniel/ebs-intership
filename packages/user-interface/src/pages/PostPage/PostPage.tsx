import React from "react";
import { Header } from "../../components/Header";
import { PostContent } from "../../components/PostContent";
import { useQuery } from "react-query";
import { mainAxios } from "../../utils";
import { Post, defaultPost } from "../../types";
import { Loading } from "../../components/Loading";
import { ErrorPage } from "../../components/ErrorPage";

export function PostPage() {
 const path = window.location.pathname;

 const { isLoading, error, data } = useQuery(
  `edit-post`,
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

 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />
     <PostContent post={post} action="view" />
    </div>
   )}
  </>
 );
}
