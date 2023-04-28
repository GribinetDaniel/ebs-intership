import React from "react";
import { Post } from "../types";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useQuery } from "react-query";
import { mainAxios } from "../utils";
import { Loading } from "../components/Loading";
import { ErrorPage } from "../components/ErrorPage/ErrorPage";
import { SearchField } from "../components/Input";
export function Homepage() {
 const { data, isLoading, error } = useQuery("posts", () => {
  return mainAxios.get("/posts");
 });

 const [inputText, setInputText] = React.useState("");
 const [posts, setPosts] = React.useState<Array<Post>>();
 React.useEffect(() => {
  if (data) setPosts(data.data);
 }, [data]);

 const filtredPosts = posts?.filter(el => {
  if (inputText === "") return el;
  let findByTagName = false;
  el.tags?.forEach(tag => {
   if (tag.name.toLocaleLowerCase().includes(inputText.toLocaleLowerCase())) {
    findByTagName = true;
   }
  });
  return (
   el.title.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()) ||
   el.body.toLocaleLowerCase().includes(inputText.toLocaleLowerCase()) ||
   findByTagName
  );
 });

 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />
     <SearchField setInputText={setInputText} />
     <div className="home-page">
      <div className="row justify-content-center" style={{ gap: "80px" }}>
       {filtredPosts?.map((post: Post) => (
        <PostCard {...post} />
       ))}
      </div>
     </div>
    </div>
   )}
  </>
 );
}
