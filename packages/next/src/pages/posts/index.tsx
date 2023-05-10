import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import React from "react";
import { Post } from "../../types";
import Pagination from "@mui/material/Pagination";
import Custom500 from "../500";

interface PostsProps {
 posts: Array<Post>;
}
export default function Posts({ posts }: PostsProps) {
 const [currentPage, setCurrentPage] = React.useState(1);
 const postsPerPage = 10;
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 const numberOfPages = Math.ceil(posts.length / postsPerPage);

 return (
  <div
   style={{
    backgroundColor: "#f5f5f5",
   }}
  >
   <div
    style={{
     display: "flex",
     flexWrap: "wrap",
     gap: "70px",
     justifyContent: "space-around",
    }}
   >
    {currentPosts.map(post => (
     <PostCard post={post} />
    ))}
   </div>
   <div
    style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}
   >
    <Pagination
     count={numberOfPages}
     size="large"
     onChange={(_, value) => setCurrentPage(value)}
    />
   </div>
  </div>
 );
}

export async function getServerSideProps() {
 const res = await fetch("http://localhost:1234/posts");
 const data = await res.json();
 return { props: { posts: data } };
}
