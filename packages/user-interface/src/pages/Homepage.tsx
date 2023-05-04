import React from "react";
import { Post } from "../types";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useQuery } from "react-query";
import { mainAxios, filterPosts } from "../utils";
import { Loading } from "../components/Loading";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { SearchField } from "../components/Input";
import { NoFindPosts } from "../components/ErrorPage";
export function Homepage() {
 const { data, isLoading, error } = useQuery("posts", () => {
  return mainAxios.get("/posts");
 });

 const [inputText, setInputText] = React.useState("");
 const [posts, setPosts] = React.useState<Array<Post>>();
 React.useEffect(() => {
  if (data) setPosts(data.data);
 }, [data]);

 const filtredPosts = React.useMemo(
  () => filterPosts(inputText, posts!),
  [inputText, posts]
 );

 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />
     <SearchField setInputText={setInputText} />
     {filtredPosts?.length === 0 ? (
      <NoFindPosts />
     ) : (
      <div className="home-page">
       <div
        className="row justify-content-center"
        style={{ gap: "50px", width: "100%" }}
       >
        {filtredPosts?.map((post: Post) => (
         <PostCard {...post} />
        ))}
       </div>
      </div>
     )}
    </div>
   )}
  </>
 );
}
