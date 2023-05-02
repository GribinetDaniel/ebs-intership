import React from "react";
import { UserContext } from "../../context/user-context";
import { Post } from "../../types";
import { Header } from "../../components/Header";
import { PostCard } from "../../components/PostCard";
import { useQuery } from "react-query";
import { mainAxios } from "../../utils";
import { Loading } from "../../components/Loading";
import { ErrorPage } from "../../components/ErrorPage/ErrorPage";
import { PlusButton } from "../../components/PlusButton";
import { useNavigate } from "react-router-dom";
import { SearchField } from "../../components/Input";
import "./index.scss";
import { NoFindPosts, NoPostsPage } from "../../components/ErrorPage";

export function UserPosts() {
 const navigate = useNavigate();
 const { user } = React.useContext(UserContext);

 const { isLoading, error, data } = useQuery("user-posts", () => {
  return mainAxios.get(`/posts`);
 });

 const [inputText, setInputText] = React.useState("");

 const userPosts: Array<Post> = data?.data.filter(
  (post: Post) => post.userId === user?.id
 );

 const filtredPosts = userPosts?.filter(el => {
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

     {userPosts.length === 0 ? (
      <NoPostsPage />
     ) : (
      <>
       <SearchField setInputText={setInputText} />
       {filtredPosts.length === 0 ? (
        <NoFindPosts />
       ) : (
        <div className="home-page">
         <div className="row justify-content-center" style={{ gap: "80px" }}>
          {filtredPosts.map((post: Post) => (
           <PostCard {...post} />
          ))}
         </div>
        </div>
       )}
      </>
     )}

     <PlusButton onClick={() => navigate("/new-post")} />
    </div>
   )}
  </>
 );
}
