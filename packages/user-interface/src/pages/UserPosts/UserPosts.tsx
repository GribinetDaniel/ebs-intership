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
import img from "./image-removebg-preview.png";
import "./index.scss";

export function UserPosts() {
 const navigate = useNavigate();
 const { user } = React.useContext(UserContext);

 const { isLoading, error, data } = useQuery("user-posts", () => {
  return mainAxios.get(`/posts`);
 });

 const userPosts = data?.data.filter((post: Post) => post.userId === user?.id);
 return (
  <>
   {isLoading && <Loading />}
   {error && <ErrorPage />}
   {data && (
    <div className="content">
     <Header />

     {userPosts.length === 0 ? (
      <div className="user-posts">
       <div className="user-posts__no-posts">
        <img src={img} alt="err" />
        <h1>OOOPS...</h1>
        <p>
         No posts yet
         <br />
         Press plus button to create a post
        </p>
       </div>
      </div>
     ) : (
      <div className="home-page">
       <div className="row justify-content-center" style={{ gap: "80px" }}>
        {userPosts?.map((post: Post) => (
         <PostCard {...post} />
        ))}
       </div>
      </div>
     )}
     <PlusButton onClick={() => navigate("/new-post")} />
    </div>
   )}
  </>
 );
}
